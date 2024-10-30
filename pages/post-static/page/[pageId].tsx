import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import Pager from "../../../components/Pager/Pager";

const PostStaticPage = (props: any) => {
  const router = useRouter();

  return (
    <>
      <ul className="client-list">
        {props.posts && props.posts.length > 0 && (
          <>
            {props.posts.map((item: any) => {
              return <li key={item.id} onClick={() => router.push(`/post-static/${item.id}`)} >{item.title}</li>;
            })}
          </>
        )}
      </ul>
      <Pager
        path='/post-static/page'
        currentPage={Number(props.currentPage)}
        totalPage={Number(props.totalPage)}
      />
    </>
  );
};

export async function getStaticProps({ params }: { params: { pageId: number } }) {
  const response = await axios.get(
    `http://localhost:5000/post?page=${params.pageId}`
  );
  const totalPage = Math.ceil(response.data.total / response.data.perPage);

  return {
    props: {
      posts: response.data.data,
      totalPage,
      currentPage: params.pageId,
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const response = await axios.get("http://localhost:5000/post");
  const totalPage = Math.ceil(response.data.total / response.data.perPage);
  const pages = [];
  for (let i = 0; i < totalPage; i++) {
    pages.push({
      params: { pageId: `${i + 1}` },
    });
  }
  return {
    paths: pages,
    fallback: true, // false or 'blocking'
  };
}

export default PostStaticPage;
