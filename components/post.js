import styles from "../styles/Post.module.scss"

export default function Post() {
    return (
        <div className={styles.post}>
            <div className={styles.image}>
                <img src="images/mask.png" />
                <div className={styles.imageContent}>
                    <p>12-16-2019</p>
                    <p>Tech</p>
                </div>
            </div>
            <div className={styles.postContent}>
                <h1>Heading</h1>
                <div className={styles.description}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget metus blandit, 
                        pharetra nisi eu, aliquet leo. risus, id lobortis massa ultrices nec.</p>
                </div>
            </div>
        </div>
    )
}