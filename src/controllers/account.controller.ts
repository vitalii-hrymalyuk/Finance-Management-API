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

export { createAccount }