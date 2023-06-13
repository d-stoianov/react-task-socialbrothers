import Head from "next/head"
import styles from "@/styles/Blog.module.scss"
import Header from '@/components/header'
import Post from "@/components/post"
import Footer from "@/components/footer"
import { useState } from "react"
import ReactPaginate from 'react-paginate'
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

	async function handlePageClick(event) {
		const pageNumber = event.selected + 1
		setCurrentPosts((await service.getPosts(pageNumber, pageSize)).posts)
	}

	return (
		<>
			<Head>
				<title>Blog</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Header title="Blog" />
			<div className={styles.container}>
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
					containerClassName={styles.pagination}
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