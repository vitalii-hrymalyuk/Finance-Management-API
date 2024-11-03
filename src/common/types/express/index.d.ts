// In a file like src/types/express/index.d.ts
import express from 'express';
import { IUser } from '../auth.types';

declare global {
	namespace Express {
		interface Request {
			user?: {
				username: string,
				email: string,
				password?: string
			}
		}
	}
}
