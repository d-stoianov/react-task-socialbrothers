import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Header from '@/components/header'
import Form from '@/components/form'
import PostList from '@/components/postList'
import { useState } from 'react';
import { ApiService } from '@/service/api-service';

const service = new ApiService()
let pageNumber = 1
const pageSize = 4

export async function getServerSideProps() {
  const initialPosts = await service.getPosts(pageNumber, pageSize);
  return {
    props: {
      initialPosts,
    },
  };
}

export default function Home({ initialPosts }) {
  const [currentPosts, setCurrentPosts] = useState(initialPosts)

  async function loadMorePosts() {
    pageNumber += 1
    const additionalPosts = await service.getPosts(pageNumber, pageSize)
    setCurrentPosts([...currentPosts, ...additionalPosts])
  }

  return (
    <>
      <Head>
        <title>React task</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <div className={styles.container}>
        <Form />
        <PostList loadMorePosts={loadMorePosts} posts={currentPosts} />
      </div>
    </>
  )
}
