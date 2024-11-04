import { Request, Response } from 'express'
import { authService } from '../services/auth.service';

const signup = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password, username } = req.body;

		if (!email || !password || !username) {
			res.status(400).json({ message: 'All fields are required' });
			return;
		}

		const { user, token } = await authService.signup({ email, password, username });
		res.cookie('jwt-token', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
		res.status(201).json(user);
	} catch (error) {
		console.log('Error signing up', error);
		res.status(500).json(error);
	}
}

const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;

		const { user, token } = await authService.login(email, password);

		res.cookie('jwt-token', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
		res.status(200).json({ message: 'Login successful' });

	} catch (error) {
		console.log('Error logging in', error);
		res.status(500).json(error);
	}
}

const logout = async (_req: Request, res: Response): Promise<void> => {
	try {
		res.clearCookie('jwt-token');
		res.status(200).json({ message: 'Logout successful' });
	} catch (error) {
		console.log('Error logging out', error);
		res.status(500).json(error);
	}
}

export { signup, login, logout };