'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';

const Todos = () => {
  const queryClient = useQueryClient();

  const mutation: any = useMutation<any>({
    mutationFn: (newTodo) =>
      fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      }),
    onMutate: (newTodo) => {
      // A mutation is about to happen
      // Optimistically update the cache with the new todo
      // This will be rolled back if the mutation fails
      // return the previous value of the todo
      // return previousTodo;
      console.log('A mutation is about to happen', newTodo);
    },
    onError: (error, newTodo, context) => {
      // An error happened!
      // rollback the optimistic update
      console.log('An error happened!', error.message, newTodo, context);
    },
    onSuccess: (data, newTodo, context) => {
      // The mutation was successful!
      // Do something with the new data
      console.log('The mutation was successful!', data, newTodo, context);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      // revalidating the data
    },
    onSettled: (data, error, newTodo, context) => {
      // The mutation is done!
      // Do something on completion or failure
      console.log('The mutation is done!', data, error, newTodo, context);
    },
  });

  const { data: todosData } = useQuery<any>({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('http://localhost:3001/todos').then((res) => res.json()),

    // select optimizes the api response and removes unnecessary data
  });
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      {mutation.isLoading ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: 'Do Laundry' });
            }}
          >
            Create Todo
          </button>
        </>
      )}

      <h1 className='text-xl mt-7'>TODOS</h1>
      <ul className='flex flex-col gap-2'>
        {todosData?.slice(0, 5).map((todo: any) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
