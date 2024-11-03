import express, { Application } from 'express';
import { Server } from 'http';
import { config } from './config';
import { appRoutes } from './routes';
import cookieParser from 'cookie-parser';

const PORT = config.PORT || 3000;

export const start = (app: Application) => {
	standardMiddleware(app)
	routesMiddleware(app)
	startServer(app)
}

const routesMiddleware = (app: Application) => {
	appRoutes(app)
}

const standardMiddleware = (app: Application) => {
	app.use(express.json({ limit: '50mb' }));
	app.use(cookieParser());
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