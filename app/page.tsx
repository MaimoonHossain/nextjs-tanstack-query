'use client';
import { useQuery, useIsFetching } from '@tanstack/react-query';
import { todo } from 'node:test';

// useIsFetching is used to check if any query is fetching data

interface Todo {
  // userId: number;
  id: number;
  title: string;
  // completed: boolean;
}

export default function Home() {
  // const isFetching = useIsFetching();
  const {
    data: todosData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
        res.json()
      ),
    // select optimizes the api response and removes unnecessary data
    select: (todosData) =>
      todosData.slice(0, 5).map((todo) => ({ id: todo.id, title: todo.title })),
  });

  const { data: usersData } = useQuery<any>({
    queryKey: ['users'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
        res.json()
      ),
    // If todos data contains some kind of data, then only fetch users data
    enabled: !!todosData,
  });

  console.log(todosData);

  if (isLoading) {
    return (
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        It is Loading...
      </main>
    );
  }

  if (isError) {
    return (
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        There is an Error!!
      </main>
    );
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='text-xl'>TODOS</h1>
      <ul>
        {todosData?.slice(0, 5).map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <h1 className='text-xl'>USERS</h1>
      <ul>
        {usersData?.slice(0, 5).map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  );
}
