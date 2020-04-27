import express from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const port = process.env.PORT || 3000

nextApp.prepare().then(() => {
	const app = express()

	app.get('/json', (req, res) => {
		return res.status(200).json({ msg: 'Useless json with status of 200 OK' })
	})

	app.get('*', (req, res) => {
		return handle(req, res)
	})

	app.listen(port, (err) => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${port}`)
	})
})
