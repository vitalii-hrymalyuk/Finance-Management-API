import { Request, Response } from "express";
import { budgetService } from '../services/budget.service';

const createBudget = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const budget = await budgetService.create(req.body, userId);
		res.status(201).json(budget);
	} catch (error) {
		console.log('Error creating budget', error);
	}
}

const getBudgets = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const budgets = await budgetService.getAll(userId);
		res.status(200).json(budgets);
	} catch (error) {
		console.log('Error getting budgets', error);
	}
}

const updateBudget = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const budgetId = req.params.id;
		const budget = await budgetService.update(parseInt(budgetId), userId, req.body);
		res.status(200).json(budget);
	} catch (error) {
		console.log('Error updating budget', error);
	}
}

const deleteBudget = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const budgetId = req.params.id;
		const budget = await budgetService.delete(parseInt(budgetId), userId);
		res.status(200).json(budget);
	} catch (error) {
		console.log('Error deleting budget', error);
	}
}

export { createBudget, getBudgets, updateBudget, deleteBudget }