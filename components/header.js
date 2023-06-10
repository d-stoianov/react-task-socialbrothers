import styles from '../styles/Header.module.scss'
import Link from 'next/link';

export default function Header() {
    return (
        <div className={styles.header}>
            <img src='images/header.png' />
            <div className={styles.headerContent}>
                <img src='images/logo.svg' />
                <div className={styles.links}>
                    <Link href="/">Home</Link>
                    <Link href="/blog">Blog</Link>
                </div>
            </div>
      </div>
    )
}