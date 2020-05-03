import fetch from 'isomorphic-unfetch'

import { useRouter } from 'next/router'
import Head from 'next/head'

import { Typography } from '@material-ui/core'

import { Layout } from '../../../components/notAuthenticated'

const Post = ({ post }) => {
	const router = useRouter()

	const title = 'post'

	console.log(post)

	return (
		<>
			<Head>
				<title>
					test
				</title>
			</Head>
			<Layout>
				<main>
					<Typography component='h1' variant='h4'>
						topic
					</Typography>
					<Typography component='h2' variant='h5'>
						slug
					</Typography>
				</main>
			</Layout>
		</>
	)
}

export const getStaticPaths = async () => {
	const response = await fetch(`${process.env.SERVER_API_URL}/posts`)
	const posts = await response.json()

	console.log('posts:', posts)

	const spreadedPosts = []

	posts.data.forEach(({ topic, slug }) => {
		slug.forEach((title) => {
			const post = {
				topic,
				slug: title.replace('.md', ''),
			}
			spreadedPosts.push(post)
		})
	})

	const paths = spreadedPosts.map(({ topic, slug }) => ({
		params: {
			topic,
			slug,
		},
	}))

	console.log(paths)

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps = async ({ params: { topic, slug } }) => {
	const formattedSlug = slug.replace('.md', '')

	const response = await fetch(
		`${process.env.SERVER_API_URL}/posts/${topic}/${formattedSlug}`
	)
	const post = await response.json()

	return {
		props: {
			post
		},
	}
}

export default Post
