import { AccountType, Report } from '../common/types';
import prisma from '../db/prismaClient';

class ReportService {

	async generateReport(username: string, accountId: number, userId: string, startDate: string, endDate: string) {

		const account = await prisma.account.findUnique({
			where: {
				id: accountId
			}
		})

		if (!account) {
			throw new Error('Account not found');
		}

		const startDateObj = new Date(startDate);
		const endDateObj = new Date(endDate);

		const transactions = await prisma.transaction.findMany({
			where: {
				accountId,
				userId
			}
		});

		const filteredTransactions = transactions.filter(transaction => {
			const transactionDate = new Date(transaction.date);
			return transactionDate >= startDateObj && transactionDate <= endDateObj;
		});

		const income = filteredTransactions.filter(transaction => transaction.type === 'INCOME').reduce((total, transaction) => total + transaction.amount, 0);
		const expense = filteredTransactions.filter(transaction => transaction.type === 'EXPENSE').reduce((total, transaction) => total + transaction.amount, 0);

		const report: Report = {
			title: 'Monthly Report',
			username,
			accountName: account.name,
			accountType: account.type as AccountType,
			balance: account.balance,
			income: income,
			expense: expense,
			period: `${startDate} to ${endDate}`,
			transactions: filteredTransactions,
		};

		return report;
	}

}

export const reportService = new ReportService();