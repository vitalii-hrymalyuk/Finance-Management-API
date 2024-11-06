import { Application } from 'express'
import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';
import { accountRoutes } from './account.routes';
import { transactionRoutes } from './transaction.routes';
import { budgetRoutes } from './budget.routes';

const BASE_PATH = '/api/v1'

export const appRoutes = (app: Application) => {
	app.use(`${BASE_PATH}/auth`, authRoutes());
	app.use(`${BASE_PATH}/user`, userRoutes())
	app.use(`${BASE_PATH}/account`, accountRoutes())
	app.use(`${BASE_PATH}/transaction`, transactionRoutes())
	app.use(`${BASE_PATH}/budget`, budgetRoutes())
}