import React, { useEffect, useState } from 'react'
import axios from "axios";
interface BlogItem {
  fields: {
    title: string;
    alias: string
  }
}
const Client = () => {

  const [blog, setBlog] = useState<BlogItem[]>();
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get('https://cdn.contentful.com/spaces/jpl2kwkwgmlb/environments/master/entries?content_type=blog&access_token=OkqBYBhvvxq0Q7fctCSozAVfrbBCtbIiCtxFefxUHa0');
      setBlog(data.data.items)
    }

    getData();
  }, []);

  return (
    <ul className="client-list">
      {blog && blog.length > 0 && (
        <>
          {blog.map(item => {
            return <li key={item.fields.alias}>{item.fields.title}</li>
          })}
        </>
      )}
    </ul>
  )
}

export default Client