import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Header from '@/components/header'
import Form from '@/components/form'
import Post from '@/components/post'

export default function Home() {
  return (
    <>
      <Head>
        <title>React task</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <div className={styles.container}>
        <Form />
        <Post />
      </div>
    </>
  )
}
