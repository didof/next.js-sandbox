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
		return { topic, slug: fs.readdirSync(pathToDir) }
	})

	res.status(200).send({ data: dirsContent })
})

export default router
