import React from 'react'
import { useRouter } from 'next/router'

const BlogDetail = () => {
  const router = useRouter()
  console.log(router.query)

  return (
    <div>[...ids]</div>
  )
}

export default BlogDetail