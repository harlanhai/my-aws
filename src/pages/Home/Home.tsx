import React, { useEffect, useState } from 'react';

type Info = {
  id: number;
  name: string;
 }
function Home() {
  const [info, setInfo] = useState<Info>();
  useEffect(() => {
    // 基本的 GET 请求
    fetch('https://tight-block-8c6c.harlanhai7023.workers.dev/')
      .then((response) => response.json())
      .then((data) => {
        setInfo(data.data);
        console.log(data)
      })
      .catch((error) => console.error('Error:', error));
  }, []);
  return (
    <>
      <div className='w-1/3 h-40 w-auto'>
        <h2>Hello AWS!</h2>
        <div>My workers data: {info?.name}</div>
      </div>
    </>
  );
}
export default Home;
