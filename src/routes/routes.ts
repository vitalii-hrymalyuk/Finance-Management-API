import { Application } from 'express'

const BASE_PATH = '/api/v1'

export const appRoutes = (app: Application) => {
	app.use(`${BASE_PATH}/`, () => {
	});
}