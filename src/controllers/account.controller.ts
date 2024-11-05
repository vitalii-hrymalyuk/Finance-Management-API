import { Request, Response } from 'express';
import { accountService } from '../services/account.service';

const createAccount = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const account = await accountService.create(req.body, userId);
		res.status(201).json(account);
	} catch (error) {
		console.log('Error creating account', error);
	}
}

const getUserAccounts = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const accounts = await accountService.getUserAccounts(userId);
		res.status(200).json(accounts);

	} catch (error) {
		console.log('Error getting user accounts', error);
	}
}

const updateUserAccount = async (req: Request, res: Response): Promise<void> => {
	try {
		const accountId = req.params.id;

		if (!accountId) {
			res.status(400).json({ message: 'Account ID is required' });
			return;
		}

		const account = await accountService.updateUserAccount(Number(accountId), req.body);
		res.status(200).json(account);
	} catch (error) {
		console.log('Error updating user account', error);
	}
}

const deleteAccount = async (req: Request, res: Response): Promise<void> => {
	try {
		const accountId = req.params.id;

		if (!accountId) {
			res.status(400).json({ message: 'Account ID is required' });
			return;
		}

		const account = await accountService.deleteAccount(Number(accountId));
		res.status(200).json(account);
	} catch (error) {
		console.log('Error deleting account', error);
	}
}

export { createAccount, getUserAccounts, updateUserAccount, deleteAccount };