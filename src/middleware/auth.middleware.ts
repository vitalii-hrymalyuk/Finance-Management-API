import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { userService } from '../services/user.service';
import { CustomJwtPayload } from '../common/types/auth.types';

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies?.['jwt-token'];
		if (!token) {
			res.status(401).json({ message: 'Unauthorized: No token provided' });
			return;
		}

		const decodedToken = jwt.verify(token, config.JWT_SECRET);

		if (typeof decodedToken !== 'object' || !('userId' in decodedToken)) {
			res.status(401).json({ message: 'Unauthorized: Invalid token' });
			return;
		}

		const decoded = decodedToken as CustomJwtPayload;

		const user = await userService.getById(decoded.userId);
		if (!user) {
			res.status(401).json({ message: 'User not found' });
			return;
		}

		req.user = user;
		next();
	} catch (error) {
		console.error('Error in protectRoute middleware', error);
		next(error); // Pass error to the next middleware
	}
};
