import express from 'express';
import { createAccount, deleteAccount, getUserAccounts, updateUserAccount } from '../controllers/account.controller';
import { protectRoute } from '../middleware/auth.middleware';

const router = express.Router();

export const accountRoutes = () => {
	router.post('/create', protectRoute, createAccount);
	router.get('/accounts', protectRoute, getUserAccounts);
	router.put('/:id', protectRoute, updateUserAccount);
	router.delete('/:id', protectRoute, deleteAccount);

	return router;
}