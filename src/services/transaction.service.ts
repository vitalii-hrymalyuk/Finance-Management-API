import { CreateTransaction, UpdateTransaction } from '../common/types';
import prisma from '../db/prismaClient';

class TransactionService {
	async create(data: CreateTransaction, accountId: number, userId: string) {

		const { date, amount, type, category, description } = data;

		const account = await prisma.account.findUnique({
			where: {
				id: accountId,
			},
		});

		if (!account) {
			throw new Error('Account not found');
		}

		if ((account.type === 'BANK' || account.type === 'CASH') && type === 'EXPENSE' && amount > account.balance) {
			throw new Error('Insufficient funds in the account');
		}

		const createData: CreateTransaction = {
			amount: amount,
			date: new Date(date),
			type: type,
			category: category,
			description: description,
		}

		const transaction = await prisma.transaction.create({
			data: {
				...createData,
				account: {
					connect: { id: accountId },
				},
				user: {
					connect: { id: userId },
				},
			},
		});

		let newBalance = account.balance;

		if (account.type === 'BANK' || account.type === 'CASH') {
			if (type === 'EXPENSE') {
				newBalance = account.balance - amount;
			} else if (type === 'INCOME') {
				newBalance = account.balance + amount;
			}
			await prisma.account.update({
				where: { id: accountId },
				data: { balance: newBalance },
			});
		}

		return transaction;
	}

	async getAll(userId: string, accountId: number) {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
				accountId,
			},
		});
		return transactions;
	}

	async update(id: number, accountId: number, userId: string, data: UpdateTransaction) {
		const transaction = await prisma.transaction.update({
			where: {
				id,
				accountId,
				userId,
			},
			data,
		});

		return transaction;
	}

	async delete(id: number, accountId: number, userId: string) {

		const transaction = await prisma.transaction.findUnique({
			where: {
				id,
				accountId,
				userId,
			},
		});

		if (!transaction) {
			throw new Error('Transaction not found');
		}

		const account = await prisma.account.findUnique({
			where: {
				id: accountId,
			},
		});

		if (!account) {
			throw new Error('Account not found');
		}

		let newBalance = account.balance;
		if (account.type === 'BANK' || account.type === 'CASH') {
			if (transaction.type === 'EXPENSE') {
				newBalance += transaction.amount; // Reversing an expense adds back to the balance
			} else if (transaction.type === 'INCOME') {
				newBalance -= transaction.amount; // Reversing income subtracts from the balance
			}
		} else if (account.type === 'CREDIT_CARD') {
			if (transaction.type === 'EXPENSE') {
				newBalance -= transaction.amount; // Reversing an expense decreases the balance owed
			} else if (transaction.type === 'INCOME') {
				newBalance += transaction.amount; // Reversing income increases the balance owed
			}
		}

		await prisma.transaction.delete({
			where: {
				id,
				accountId,
				userId,
			},
		});

		await prisma.account.update({
			where: { id: accountId },
			data: { balance: newBalance },
		});

		return transaction;
	}

	async getCategories() {
		const categories = [
			'Food',
			'Utilities',
			'Entertainment',
			'Personal',
			'Other',
		]
		return categories;
	}
}

export const transactionService = new TransactionService();
