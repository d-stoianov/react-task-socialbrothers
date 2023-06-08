import styles from '../styles/Header.module.scss'

export default function Header() {
    return (
        <div className={styles.header}>
            <img src='images/header.png' />
            <div className={styles.headerContent}>
                <img src='images/logo.svg' />
                <div className={styles.links}>
                    <a>Home</a>
                    <a>Blog</a>
                </div>
            </div>
      </div>
    )
}