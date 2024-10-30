import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const BlogDetail = () => {
  const router = useRouter()
  console.log(router.query)

  useEffect(() => {
    axios.get(`http://localhost:5000/post-detail?id=${router.query.blogId}`)
    .then(response => {
      console.log(response.data)
    })
  }, []);
  return (
    <div>[id]</div>
  )
}

export default BlogDetail