import express from 'express';
import { getMonthlyReport } from '../controllers/report.controller';
import { protectRoute } from '../middleware/auth.middleware';

const router = express.Router();

export const reportRoutes = () => {

	router.post('/monthly', protectRoute, getMonthlyReport);

	return router;
}