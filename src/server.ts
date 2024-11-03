import { Application } from 'express'
import { Server } from 'http'
import { config } from './config';
import { appRoutes } from './routes';

const PORT = config.PORT || 3000;

export const start = (app: Application) => {
	routesMiddleware(app)
	startServer(app)
}

const routesMiddleware = (app: Application) => {
	appRoutes(app)
}

const startServer = async (app: Application) => {
	try {
		const server = new Server(app);
		server.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`)
		})
	} catch (error) {

	}
}