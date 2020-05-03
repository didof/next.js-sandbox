import fs from 'fs'
import path from 'path'

import express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
	const dirsNames = await fs.readdirSync('posts')

	const dirsPaths = await dirsNames.map((dir) => {
		return path.join(process.cwd(), 'posts', dir)
	})

	const dirsContent = await dirsPaths.map((pathToDir) => {
		const topic = pathToDir.split('topic_').pop()
		return {
			topic,
			slug: fs.readdirSync(pathToDir),
		}
	})

	res.status(200).send({ data: dirsContent })
})

router.get('/:topic/:slug', async (req, res) => {
	const { topic, slug } = req.params

	const dir = `topic_${topic}`
	const filename = `${slug}.md`

	//TODO: pick and read the file requested
	const pathToDoc = await path.join(process.cwd(), 'posts', dir, filename)
	const contents = fs.readFileSync(pathToDoc).toString()

	//TODO: trasfromalo e formattalo

	//TODO: restituiscilo

	return res.status(200).json(contents)
})

export default router
