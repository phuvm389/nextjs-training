import React from 'react'

import Image from 'next/image';
import httpClient from '../helper/httpClient';
import router from 'next/router';

interface BlogItem {
  url: string;
  title: string;
}

const Server = (props: any) => {
  const blog = props.data as BlogItem[];

  function onImageChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      let formData = new FormData();
      formData.append('media', img);
      formData.append('title', img.name);
      httpClient
        .post("/media", formData)
        .then((res) => {
          // console.log('finished', res);
          event.target.value = null;
          router.replace(router.asPath);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }

  return (
    <>
      <h1>Select Image</h1>
      <input type="file" name="myImage" onChange={onImageChange}  />
      <h2>List Image</h2>
      <ul className="server-list">
        {blog && blog.length > 0 && (
          <>
            {blog.map(item => {
              return <li key={item.url}>
                <div>{item.title}</div>
                <Image
                  src={item.url}
                  alt={item.title}
                  width={200}
                  height={200}
                />
              </li>
            })}
          </>
        )}
      </ul>
    </>
  )
}

export async function getServerSideProps() {
  const data = await httpClient.get("/media");
  return {
    props: {
      data: data.data
    }, // will be passed to the page component as props
  }
}

export default Server
