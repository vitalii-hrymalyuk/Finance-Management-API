import { Request, Response } from 'express';
import { transactionService } from '../services/transaction.service';

const createTransaction = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const accountId = req.body.accountId;

		const transaction = await transactionService.create(req.body, accountId, userId);
		res.status(201).json(transaction);
	} catch (error) {
		console.log('Error creating transaction', error);
	}
}

const getAllTransactions = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const accountId = req.body.accountId;

		const transactions = await transactionService.getAll(userId, parseInt(accountId as string));
		res.status(200).json(transactions);
	} catch (error) {
		console.log('Error getting transactions', error);
	}

}

const updateTransaction = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const accountId = req.body.accountId;
		const transactionId = req.params.id;

		const transaction = await transactionService.update(parseInt(transactionId), accountId, userId, req.body);
		res.status(200).json(transaction);
	} catch (error) {
		console.log('Error updating transaction', error);
	}
}

const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const accountId = parseInt(req.body.accountId as string, 10);
		const transactionId = parseInt(req.params.id, 10);

		if (isNaN(accountId) || isNaN(transactionId)) {
			res.status(400).json({ message: 'Invalid accountId or transactionId' });
			return;
		}

		const transaction = await transactionService.delete(transactionId, accountId, userId);
		res.status(200).json(transaction);
	} catch (error) {
		console.log('Error deleting transaction', error);
	}
}

const getCategories = async (_req: Request, res: Response): Promise<void> => {
	try {
		const categories = await transactionService.getCategories();
		res.status(200).json(categories);
	} catch (error) {
		console.log('Error getting categories', error);
	}
}

export { createTransaction, getAllTransactions, updateTransaction, deleteTransaction, getCategories };