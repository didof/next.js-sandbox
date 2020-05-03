require('dotenv').config()

//* core
import express from 'express'
import next from 'next'

//* parsing
import cookieParser from 'cookie-parser'
import routes from './router'

//* auth
import passport from 'passport'
import { utils, initialiseAuthentication } from './auth'
import { ROLES } from '../utils'

//* db
import { connectToDatabase } from './database/connection'

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const port = process.env.PORT || 3001

nextApp.prepare().then(async () => {
	const app = express()

	app.use(express.urlencoded({ extended: false }))
	app.use(express.json())
	app.use(cookieParser())

	app.use(passport.initialize())

	routes(app)
	initialiseAuthentication(app)

	app.get(
		'/admin-dashboard',
		passport.authenticate('jwt', { failureRedirect: '/login' }),
		utils.checkIsInRole(ROLES.Admin),
		(req, res) => {
			return handle(req, res)
		}
	)

	app.get(
		'/customer-dashboard',
		passport.authenticate('jwt', { failureRedirect: '/login' }),
		utils.checkIsInRole(ROLES.Customer),
		(req, res) => {
			return handle(req, res)
		}
	)

	app.get(
		'/both-dashboard',
		passport.authenticate('jwt', { failureRedirect: '/login' }),
		utils.checkIsInRole(ROLES.Admin, ROLES.Customer),
		(req, res) => {
			return handle(req, res)
		}
	)

	app.get('*', (req, res) => {
		return handle(req, res)
	})

	await connectToDatabase()

	app.listen(port, (err) => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${process.env.SERVER_URL}`)
		console.log(`> Modality: ${process.env.NODE_ENV}`)
	})
})
