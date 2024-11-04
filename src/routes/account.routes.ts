import express from 'express';
import { createAccount } from '../controllers/account.controller';
import { protectRoute } from '../middleware/auth.middleware';

const router = express.Router();

export const accountRoutes = () => {
	router.post('/create', protectRoute, createAccount);

	return router;
}