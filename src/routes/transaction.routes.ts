import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { createTransaction, deleteTransaction, getAllTransactions, getCategories, updateTransaction } from '../controllers/transaction.controller';

const router = express.Router();

export const transactionRoutes = () => {
	router.post('/create', protectRoute, createTransaction)
	router.get('/all', protectRoute, getAllTransactions)
	router.put('/:id', protectRoute, updateTransaction)
	router.delete('/:id', protectRoute, deleteTransaction)
	router.get('/categories', protectRoute, getCategories)

	return router;
}