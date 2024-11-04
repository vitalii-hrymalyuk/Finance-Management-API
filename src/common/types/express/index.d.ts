import { IUser } from '../auth.types';

declare global {
	namespace Express {
		interface Request {
			user?: import('../auth.types').IUser;
		}
	}
}
