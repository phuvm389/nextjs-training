import axios from "axios";
import React from "react";
import { useRouter } from "next/router";

const PostStaticPage = (props: any) => {
  const router = useRouter();
  return (
    <>
      <h3>{props.postDetail.title}</h3>
      <div>{props.postDetail.body}</div>
      <button onClick={() => router.back()}>Back</button>
    </>
  );
};

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const response = await axios.get(
    `http://localhost:5000/post-detail?slug=${params.slug}`
  );

  return {
    props: {
      postDetail: response.data,
      slug: params.slug,
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const response = await axios.get("http://localhost:5000/post");
  const posts: any[] = [];

  response.data.data.forEach((item: any) => {
    posts.push({
      params: { slug: `${item.slug}` },
    });
  })
    

  return {
    paths: posts,
    fallback: true, // false or 'blocking'
  };
}

export default PostStaticPage;
