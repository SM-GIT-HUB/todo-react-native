import { useTodos } from '@/hooks/useTodos';
import React from 'react';
import AlertModal from './AlertModal';

interface DeleteAlertProps {
  id: number | null;
  isActive: boolean;
  setIsActive: (v: boolean) => void;
  setDeleteId: (v: number | null) => void;
}

export default function DeleteAlert({ id, isActive, setIsActive, setDeleteId }: DeleteAlertProps) {
  const { deleteTodo } = useTodos();
  
  function handleConfirm()
  {
    if (id == null) {
      return;
    }

    deleteTodo({ id });
    setIsActive(false);
    setDeleteId(null);
  }

  return (
    <AlertModal isActive={isActive} setIsActive={setIsActive} title='Delete this todo'
    subTitle='Are you sure about this?' runOnSubmit={handleConfirm} falsyText='Cancel' truthyText='Delete' />
  )
}