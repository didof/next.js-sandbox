import authRoutes from './auth.routes'
import postsRoutes from './posts.routes'

export default (app) => {
    app.use(`${process.env.BASE_API_URL}/auth`, authRoutes)
    app.use(`${process.env.BASE_API_URL}/posts`, postsRoutes)
}