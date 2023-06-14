import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Header from '@/components/header'
import Form from '@/components/form'
import PostList from '@/components/postList'
import Footer from '@/components/footer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { ApiService } from '@/service/api-service'

const service = new ApiService()
let pageNumber = 1
const pageSize = 4

export async function getServerSideProps() {
	const initialPosts = (await service.getPosts(pageNumber, pageSize)).posts
	const categories = (await service.getCategories()).categories
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
		const loaderToast = toast.info('Loading more posts...')

		const response = (await service.getPosts(pageNumber, pageSize))

		toast.dismiss(loaderToast)

		if (!response.success) {
			toast.error(response.errorMessage)
		} else {
			toast.success("Successful !")
			const additionalPosts = response.posts
			pageNumber += 1
			setCurrentPosts([...currentPosts, ...additionalPosts])
		}
	}

	async function createPost(postData) {
		if (!postData) {
			return
		}

		const loaderToast = toast.info('Creating post...')

		const response = await service.createPost(postData.title, postData.categoryId,
			postData.description, postData.image, postData.imageName)

		toast.dismiss(loaderToast)

		if (!response.success) {
			toast.error(response.errorMessage)
		} else {
			const refreshedPosts = await (await service.getPosts(1, currentPosts.length)).posts // reload posts
			toast.success("Successful !")
			setCurrentPosts(refreshedPosts)
		}
	}

	return (
		<>
			<Head>
				<title>React task</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Header />
			<div className={styles.container}>
				<ToastContainer
					position="top-right"
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
				/>
				<Form categories={categories} onFormSubmit={createPost} />
				<PostList loadMorePosts={loadMorePosts} posts={currentPosts} />
			</div>
			<Footer />
		</>
	)
}