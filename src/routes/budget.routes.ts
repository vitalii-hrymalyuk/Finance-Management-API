import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { createBudget, deleteBudget, getBudgets, updateBudget } from '../controllers/budget.controller';

const router = express.Router();

export const budgetRoutes = () => {

	router.post('/create', protectRoute, createBudget);
	router.get('/budgets', protectRoute, getBudgets);
	router.put('/:id', protectRoute, updateBudget);
	router.delete('/:id', protectRoute, deleteBudget);

	return router;
}