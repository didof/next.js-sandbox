import fs from 'fs'

const Post = ({ slug }) => {
	return <div>hello {slug}</div>
}

export const getStaticPaths = async () => {
	const files = fs.readdirSync('posts')
	console.log(files)
	const paths = files.map((filename) => ({
		params: {
			slug: filename.replace('.md', ''),
		},
	}))
	console.log(paths)

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps = async (ctx) => {
	const { params } = ctx
	const { slug } = params

	return {
		props: {
			slug,
		},
	}
}

export default Post
