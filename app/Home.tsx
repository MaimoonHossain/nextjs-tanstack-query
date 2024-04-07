'use client';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const {
    data: todosData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<any>({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
        res.json()
      ),
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
    <main className='flex min-h-screen flex-col items-center justify-between p-24'></main>
  );
}
