import Head from 'next/head'
import { Layout } from '../components/notAuthenticated'

export default function Home() {
	const title = 'Temporary tab title'

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<Layout><main>index</main></Layout>
		</>
	)
}
