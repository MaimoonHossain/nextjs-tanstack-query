'use client';
import { useQuery, useIsFetching } from '@tanstack/react-query';

export default function Home() {
  const { data, isLoading, isError, isSuccess } = useQuery<any>({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
        res.json()
      ),
  });

  console.log('🚀 ~ Home ~ data:', data);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'></main>
  );
}
