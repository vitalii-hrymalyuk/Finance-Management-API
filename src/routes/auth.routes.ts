import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller';


const router = express.Router();

export const authRoutes = () => {
	router.post('/signup', signup);
	router.post('/login', login);
	router.post('/logout', logout);

	return router;
}