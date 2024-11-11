import { Request, Response } from 'express';
import { reportService } from '../services/report.service';

const getMonthlyReport = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const username = req.user?.username;

		const accountId = req.query.accountId as string;
		const startDate = req.body.startDate;
		const endDate = req.body.endDate;
		const reportType = req.body.reportType;

		const report = await reportService.generateReport(username!, parseInt(accountId), userId, startDate, endDate);
		res.status(200).json(report);

	} catch (error) {
		console.log('Error generating report', error);
	}
}

export { getMonthlyReport }