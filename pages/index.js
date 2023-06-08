import Head from 'next/head'
import Header from '@/components/header'
import Form from '@/components/form'

export default function Home() {
  return (
    <>
      <Head>
        <title>React task</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Form />
    </>
  )
}
