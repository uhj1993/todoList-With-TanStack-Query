import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseMutationOptions } from '@tanstack/react-query';
import { QueryTodoKeys } from '@src/constants/QueryTodoKeys';
import { getTodoListAPI, getTodoByIdAPI, createTodoAPI, updateTodoAPI, deleteTodoAPI } from '@src/apis/todos';
import useToast from '@src/hooks/useToast';

export const useGetTodoListQuery = () => {
  const toast = useToast();
  return useQuery(['todoList'], getTodoListAPI, {
    suspense: true,
    staleTime: 5000,
    onError: (error) => {
      toast.error(error);
    },
  });
};

export const useGetTodoByIdQuery = (todoId: string) => {
  const toast = useToast();
  return useQuery(['todo'], () => getTodoByIdAPI(todoId), {
    suspense: true,
    staleTime: 5000,
    onError: (error) => {
      toast.error(error);
    },
  });
};

export const useCreateTodoQuery = (todo: any) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(() => createTodoAPI(todo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todoList']);
      toast.success('추가되었습니다');
    },
    onError: (error) => {
      toast.error(error);
    },
  });
};

export const useUpdateTodoQuery = (id: string, todo: any) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(() => updateTodoAPI(id, todo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todoList']);
      toast.success('수정되었습니다');
    },
    onError: (error) => {
      toast.error(error);
    },
  });
};

export const useDeleteTodoQuery = (id: string) => {
  console.log('id:', id);
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(() => deleteTodoAPI(id), {
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries(['todo']);
      toast.success('삭제되었습니다');
    },
    onError: (error) => {
      toast.error(error);
    },
  });
};
