import styles from "../styles/PostList.module.scss"
import Post from "./post"

export default function postList() {
    return (
        <div className={styles.postList}>
            <div className={styles.postListContent}>
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
            <button>Laad meer</button>
        </div>
    )
}