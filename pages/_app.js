import '@/styles/globals.scss'
import { Inter } from 'next/font/google'

// global font
const inter = Inter({
	subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
	return (
		<main className={inter.className}>
			<Component {...pageProps} />
		</main>
	)
}