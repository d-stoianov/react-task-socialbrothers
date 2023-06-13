import styles from "../styles/Post.module.scss"

function formatDate(date) {
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	const year = date.getFullYear()
	return `${day}/${month}/${year}`
}

export default function Post({ title, date, category, description, image }) {
	const defaultImage = "images/post.png"
	const formattedDate = formatDate(new Date(date))

	return (
		<div className={styles.post}>
			<div className={styles.image}>
				{image ? <img src={image} /> : <img src={defaultImage} />}

				<div className={styles.imageContent}>
					<p>{formattedDate}</p>
					<p>{category}</p>
				</div>
			</div>
			<div className={styles.postContent}>
				<h1>{title}</h1>
				<div className={styles.description}>
					<p>{description}</p>
				</div>
			</div>
		</div>
	)
}