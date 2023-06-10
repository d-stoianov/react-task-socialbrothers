import Head from "next/head"
import Header from '@/components/header'
import Post from "@/components/post"
import { useState } from "react"
import { ApiService } from "@/service/api-service"

const service = new ApiService()
let pageNumber = 1
const pageSize = 8

export async function getServerSideProps() {
  const initialPosts = await service.getPosts(pageNumber, pageSize);
  return {
    props: {
      initialPosts,
    },
  };
}

export default function Blog({ initialPosts }) {
    return (
    <>
        <Head>
            <title>Blog</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Header />
                {initialPosts.map((post, index) => {
                    return <Post key={index} title={post.title} date={post.date} category={post.category} 
                    description={post.description} image={post.imageUrl} />
                })}
    </>
    )
}