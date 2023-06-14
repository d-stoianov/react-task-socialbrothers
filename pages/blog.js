import Head from "next/head"
import styles from "@/styles/Blog.module.scss"
import Header from '@/components/header'
import Post from "@/components/post"
import Footer from "@/components/footer"
import { useState } from "react"
import ReactPaginate from 'react-paginate'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ApiService } from "@/service/api-service"

const service = new ApiService()
let pageNumber = 1
const pageSize = 8

export async function getServerSideProps() {
	const { posts: initialPosts, total: totalPostsAmount } = await service.getPosts(pageNumber, pageSize)
	return {
		props: {
			initialPosts,
			totalPostsAmount,
		},
	}
}

export default function Blog({ initialPosts, totalPostsAmount }) {
	const [currentPosts, setCurrentPosts] = useState(initialPosts)
	const [loading, setLoading] = useState(false)

	async function handlePageClick(event) {
		const loaderToast = toast.info('Loading page...')
		setLoading(true)

		const pageNumber = event.selected + 1
		const response = await service.getPosts(pageNumber, pageSize)

		toast.dismiss(loaderToast)
		setLoading(false)

		if (!response.success) {
			toast.error(response.errorMessage)
		} else {
			toast.success("Successful !")
			setCurrentPosts(response.posts)
		}
	}

	return (
		<>
			<Head>
				<title>Blog</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Header title="Blog" />
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
				<div className={styles.containerContent}>
					{currentPosts.map((post, index) => {
						return <Post key={index} title={post.title} date={post.date} category={post.category}
							description={post.description} image={post.imageUrl} />
					})}
				</div>
				<ReactPaginate
					breakLabel="..."
					nextLabel="Volgende pagina →"
					previousLabel=""
					pageRangeDisplayed={5}
					marginPagesDisplayed={1}
					pageCount={totalPostsAmount / pageSize}
					renderOnZeroPageCount={null}
					onPageChange={handlePageClick}
					containerClassName={!loading ? styles.pagination : styles.disabledPagination}
					pageClassName={styles.pageItem}
					nextLinkClassName={styles.nextButton}
					activeClassName={styles.selectedPage}
					breakClassName={styles.breakItem}
				/>
			</div>
			<Footer />
		</>
	)
}