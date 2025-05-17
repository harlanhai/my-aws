import React, { useEffect, useState } from 'react';

type Info = {
  email: number;
  name: string;
 }
function Home() {
  const [info, setInfo] = useState<Info>();
  useEffect(() => {
    // 基本的 GET 请求
    // fetch('https://tight-block-8c6c.harlanhai7023.workers.dev/')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setInfo(data.data);
    //     console.log(data)
    //   })
    //   .catch((error) => console.error('Error:', error));
    fetch("https://my-graphql-api.harlanhai7023.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `
          {
            hello
            user(id: "1") {
              name
              email
            }
          }
        `
      })
    })
    .then(response => response.json())
    .then(data => {
      setInfo(data.data.user)
      console.log(data)
    });
  }, []);
  return (
    <>
      <div className='w-full text-center h-60 text-5xl'>
        <h2>Harlan's AI</h2>
        <div>My workers data: {info?.name}</div>
      </div>
    </>
  );
}
export default Home;
