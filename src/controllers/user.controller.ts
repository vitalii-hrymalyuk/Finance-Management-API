import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { BadRequestError } from '../common/errors/BadRequestError';

const updateUser = async (req: Request, res: Response) => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const user = await userService.update(userId, req.body);

		res.status(200).json(user);
	} catch (error) {
		console.log('Error in updateUser', error);
		res.status(500).json({ message: 'Interval server error' });
	}
}
const changePassword = async (req: Request, res: Response) => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const user = await userService.changePassword(userId, req.body.newPassword);

		res.status(200).json(user);
	} catch (error) {
		console.log('Error in changePassword', error);
		if (error instanceof BadRequestError) {
			res.status(error.statusCode).json({ message: error.message });
		} else {
			res.status(500).json({ message: 'Internal server error' });
		}
	}
}

export { updateUser, changePassword };