import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("todos.db");

export function initDB()
{
  db.execSync(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      isCompleted INTEGER NOT NULL DEFAULT 0
    );
  `)
}

export type TodoType = {
    id: number;
    text: string;
    isCompleted: boolean;
}

export function dbGetTodos()
{
  const todos = db.getAllSync<TodoType>("SELECT * FROM todos ORDER BY id DESC");

  return todos.map((t) => ({
    id: t.id,
    text: t.text,
    isCompleted: !!t.isCompleted
  }))
}

export function dbAddTodo({ text } : { text: string })
{
  const result = db.runSync("INSERT INTO todos (text, isCompleted) VALUES (?, ?)", [text, 0]);
  return { id: result.lastInsertRowId, text, isCompleted: false };
}

export function dbToogleTodo({ id } : { id: number })
{
  const [todo] = db.getAllSync<TodoType>("SELECT * FROM todos WHERE id = ?", [id]);

  if (!todo) {
    return;
  }

  db.runSync("UPDATE todos SET isCompleted = ? WHERE id = ?", [todo.isCompleted ? 0 : 1, id]);
}

export function dbUpdateTodo({id, text} : { id: number, text: string }) {
  db.runSync("UPDATE todos SET text = ? WHERE id = ?", [text, id]);
}

export function dbDeleteTodo({ id } : { id: number }) {
  db.runSync("DELETE FROM todos WHERE id = ?", [id]);
}

export function dbDeleteAll() {
  db.runSync("DELETE FROM todos");
}
