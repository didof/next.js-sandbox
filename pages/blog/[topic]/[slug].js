import fetch from 'isomorphic-unfetch'
import matter from 'gray-matter'
import marked from 'marked'

import { useRouter } from 'next/router'
import Head from 'next/head'

import { Layout } from '../../../components/notAuthenticated'
import { Typography, Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(3),
	},
}))

const Post = ({ content, data }) => {
	const classes = useStyles()

	const router = useRouter()

	const title = 'post'

	return (
		<>
			<Head>
				<title>
					{data.title}
					<meta name='description' content={data.description} />
				</title>
			</Head>
			<Layout>
				<main>
					<Grid container spacing={3}>
						<Grid item lg={4}>
							<Typography>Correlated posts</Typography>
						</Grid>
						<Grid item lg={4}>
							<Paper className={classes.paper}>
								<div dangerouslySetInnerHTML={{ __html: content }} />
							</Paper>
						</Grid>
						<Grid item lg={4}>
							<Typography>Other content</Typography>
						</Grid>
					</Grid>
				</main>
			</Layout>
		</>
	)
}

export const getStaticPaths = async () => {
	const response = await fetch(`${process.env.SERVER_API_URL}/posts`)
	const posts = await response.json()

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

	const markdown = await response.json()

	const parsedMarkdown = matter(markdown)

	const htmlString = marked(parsedMarkdown.content)

	return {
		props: {
			content: htmlString,
			data: parsedMarkdown.data,
		},
	}
}

export default Post
