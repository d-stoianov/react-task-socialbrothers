import Head from "next/head"
import Header from '@/components/header'

export default function Blog() {
    return (
    <>
        <Head>
            <title>Blog</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Header />
    </>
    )
}