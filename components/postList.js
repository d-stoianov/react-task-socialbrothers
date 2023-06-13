import styles from "../styles/PostList.module.scss"
import Post from "./post"

export default function postList({ posts, loadMorePosts }) {
	return (
		<div className={styles.postList}>
			<div className={styles.postListContent}>
				{posts.map((post, index) => {
					return <Post key={index} title={post.title} date={post.date} category={post.category}
						description={post.description} image={post.imageUrl} />
				})}
			</div>
			<button onClick={loadMorePosts}>Laad meer</button>
		</div>
	)
}