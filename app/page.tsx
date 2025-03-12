"use client"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '../api/api';


interface Data {
  title: string,
  body: string,
}

export default function Home() {
  const [data, setData] = useState<Data>();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    {

      api.get(`/posts/${id}`)
        .then(response => {
          setData(response.data);

          api.post('/farkibirapi', { ...response.data })
            .then(postResponse => {
              console.log(postResponse.data);
            })

        })

    }
  }, [id]);



  return (
    <div>
      <h1 className='text-3xl mb-5'>Post İçeriği</h1>
      {data &&
        <div>
          <h1 className='text-xl font-bold mb-5'>{data.title}</h1>
          <p>{data.body}</p>
        </div>


      }
    </div>
  );
}