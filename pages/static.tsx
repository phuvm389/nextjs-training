import React, { useEffect } from 'react'
import axios from "axios";
import { useRouter } from 'next/router'

interface BlogItem {
  fields: {
    title: string;
    alias: string
  }
}

const Static = (props: any) => {
  const blog = props.data.items as BlogItem[];
  const router = useRouter()
  const handleGotToHome = () => {
    router.push('/server');
  }


  useEffect(() => {
    // Always do navigations after the first render
    router.push('/static?counter=10', undefined, { shallow: true })
  }, [])
  
  return (
    <>
      <ul className="static-list">
        {blog && blog.length > 0 && (
          <>
            {blog.map(item => {
              return <li key={item.fields.alias}>{item.fields.title}</li>
            })}
          </>
        )}
      </ul>
      <button onClick={handleGotToHome}>Go to home</button>
    </>
  )
}

export async function getStaticProps() {
  console.log('getStaticProps')
  const data = await axios.get('https://cdn.contentful.com/spaces/jpl2kwkwgmlb/environments/master/entries?content_type=blog&access_token=OkqBYBhvvxq0Q7fctCSozAVfrbBCtbIiCtxFefxUHa0');
  return {
    props: {
      data: data.data
    }, // will be passed to the page component as props
    revalidate: 20,
  }
}

export default Static