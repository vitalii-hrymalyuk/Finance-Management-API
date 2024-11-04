import { Application } from 'express'
import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';

const BASE_PATH = '/api/v1'

export const appRoutes = (app: Application) => {
	app.use(`${BASE_PATH}/auth`, authRoutes());
	app.use(`${BASE_PATH}/user`, userRoutes())
}