import { NextFunction, Response, Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';
import { userService } from '../services/user.service';

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies['jwt-token'];
		if (!token) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;

		if (!decoded) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}
		const user = await userService.getById(decoded.userId);
		if (!user) {
			res.status(401).json({ message: 'User not found' });
			return;
		}

		const { username, email } = user;

		req.user = { username, email };
		next();
	} catch (error) {
		console.log('Error in protectRoute middleware', error);
		res.status(500).json({ message: 'Interval server error' });
	}
}