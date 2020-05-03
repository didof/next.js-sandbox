import Head from 'next/head'
import { Layout } from '../components/notAuthenticated'

const guestDashboard = () => {
	const title = 'Temporary tab title'

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<Layout><main><h1>Index</h1></main></Layout>
		</>
	)
}

export default guestDashboard