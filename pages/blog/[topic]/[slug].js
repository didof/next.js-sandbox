import { useRouter } from 'next/router'
import Head from 'next/head'

import { Typography } from '@material-ui/core'

import { Layout } from '../../../components/notAuthenticated'

const Post = ({content}) => {
	const router = useRouter()

	const title = 'post'

	const { topic, slug } = router.query

	return (
		<>
			<Head>
				<title>{topic} - {slug}</title>
			</Head>
			<Layout>
				<main>
					<Typography component='h1' variant='h4'>
						{topic}
					</Typography>
					<Typography component='h2' variant='h5'>
						{slug}
					</Typography>
					<Typography component='p' variant='body1'>
						{content}
					</Typography>
				</main>
			</Layout>
		</>
	)
}

Post.getInitialProps = async (ctx) => {
	console.log(ctx)


	const content = 'content'

	return {
		content
	}
}

export default Post