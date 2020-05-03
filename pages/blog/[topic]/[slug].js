import { useRouter } from 'next/router'
import Head from 'next/head'

import { Typography } from '@material-ui/core'

import { Layout } from '../../../components/notAuthenticated'

export default function Post() {
	const router = useRouter()

	const title = 'post'

	const { topic, slug } = router.query

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<Layout>
				<main>
					<Typography component='h1' variant='h4'>
						{topic}
					</Typography>
					<Typography component='h2' variant='h5'>
						{slug}
					</Typography>
				</main>
			</Layout>
		</>
	)
}
