import express from 'express';
import { changePassword, getUserProfile, updateUser } from '../controllers/user.controller';
import { protectRoute } from '../middleware/auth.middleware';

const router = express.Router();

export const userRoutes = () => {
	router.put('/update', protectRoute, updateUser);
	router.put('/change-password', protectRoute, changePassword);
	router.get('/profile', protectRoute, getUserProfile);

	return router;
}