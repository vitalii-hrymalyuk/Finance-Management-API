import express from 'express';
import { changePassword, updateUser } from '../controllers/user.controller';
import { protectRoute } from '../middleware/auth.middleware';

const router = express.Router();

export const userRoutes = () => {
	router.put('/update', protectRoute, updateUser);
	router.put('/change-password', protectRoute, changePassword);

	return router;
}