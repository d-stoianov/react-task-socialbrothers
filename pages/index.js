import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Header from '@/components/header'
import Form from '@/components/form'
import PostList from '@/components/postList'
import Footer from '@/components/footer'
import { useState } from 'react'
import { ApiService } from '@/service/api-service'

const service = new ApiService()
let pageNumber = 1
const pageSize = 4

export async function getServerSideProps() {
	const initialPosts = (await service.getPosts(pageNumber, pageSize)).posts
	const categories = await service.getCategories()
	return {
		props: {
			initialPosts,
			categories,
		},
	}
}

export default function Home({ initialPosts, categories }) {
	const [currentPosts, setCurrentPosts] = useState(initialPosts)

	async function loadMorePosts() {
		pageNumber += 1
		const additionalPosts = (await service.getPosts(pageNumber, pageSize)).posts
		setCurrentPosts([...currentPosts, ...additionalPosts])
	}

	async function createPost(postData) {
		if (!postData) {
			return
		}
		await service.createPost(postData.title, postData.categoryId,
			postData.description, postData.image, postData.imageName)

		const refreshedPosts = await service.getPosts(1, currentPosts.length) // reload posts
		setCurrentPosts(refreshedPosts)
	}

	return (
		<>
			<Head>
				<title>React task</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Header />
			<div className={styles.container}>
				<Form categories={categories} onFormSubmit={createPost} />
				<PostList loadMorePosts={loadMorePosts} posts={currentPosts} />
			</div>
			<Footer />
		</>
	)
}