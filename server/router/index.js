import authRoutes from './auth.routes'

export default (app) => {
    app.use(`${process.env.BASE_API_URL}/auth`, authRoutes)
}