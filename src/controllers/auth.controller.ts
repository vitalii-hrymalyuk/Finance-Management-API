import { Request, Response } from 'express'
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';
import * as bcrypt from 'bcryptjs';

const signup = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password, username } = req.body;
		const user = await authService.signup({ email, password, username });
		const { password: _password, ...rest } = user;
		const token = await authService.signJWT(user.id);
		res.cookie('jwt-token', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
		res.status(201).json(rest);
	} catch (error) {
		console.log('Error signing up', error);
		res.status(500).json(error);
	}
}

const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;

		const user = await userService.getByEmail(email);

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			res.status(401).json({ message: 'Invalid credentials' });
			return;
		}

		const token = await authService.signJWT(user.id);
		res.cookie('jwt-token', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
		res.status(200).json({ message: 'Login successful' });

	} catch (error) {
		console.log('Error logging in', error);
		res.status(500).json(error);
	}
}

const logout = async (req: Request, res: Response): Promise<void> => {
	try {
		res.clearCookie('jwt-token');
		res.status(200).json({ message: 'Logout successful' });
	} catch (error) {
		console.log('Error logging out', error);
		res.status(500).json(error);
	}
}

export { signup, login, logout };