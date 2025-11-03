import { dbAddTodo, dbDeleteTodo, dbGetTodos, dbToogleTodo, dbUpdateTodo, initDB, TodoType } from "@/lib/database";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type TodosContextType = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  addTodo: ({ text }: { text: string }) => void;
  toogleTodo: ({ id }: { id: number }) => void;
  updateTodo: ({ id, text }: { id: number, text: string }) => void;
  deleteTodo: ({ id }: { id: number }) => void;
}

const TodosContext = createContext<TodosContextType | null>(null);

export function TodosProvider({ children }: { children: ReactNode })
{
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<TodoType[]>([]);

  function addTodo({ text }: { text: string })
  {
    const todo =  dbAddTodo({ text });
    setTodos(prev => [todo, ...prev]);
  }

  function toogleTodo({ id }: { id: number })
  {
    dbToogleTodo({ id });

    setTodos(prev => prev.map((t) => {
      return (t.id == id)? { ...t, isCompleted: !t.isCompleted } : t;
    }))
  }

  function updateTodo({ id, text }: { id: number, text: string })
  {
    dbUpdateTodo({ id, text });

    setTodos(prev => prev.map((t) => {
      return (t.id == id)? { ...t, text } : t;
    }))
  }

  function deleteTodo({ id }: { id: number })
  {
    dbDeleteTodo({ id });
    setTodos(prev => prev.filter((t) => t.id != id));
  }

  useEffect(() => {
    initDB();
    setIsLoading(true);
    const res = dbGetTodos();
    setTodos(res);
    setIsLoading(false);
  }, [])

  return (
    <TodosContext.Provider value={{ todos, setTodos, isLoading, setIsLoading, addTodo, toogleTodo, updateTodo, deleteTodo }}>
      {children}
    </TodosContext.Provider>
  )
}

export function useTodos()
{
  const ctx = useContext(TodosContext);

  if (!ctx) {
    throw new Error("useTodos must be used inside TodosProvider");
  }

  return ctx;
}
