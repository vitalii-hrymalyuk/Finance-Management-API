import { CreateTransaction, UpdateTransaction } from '../common/types';
import prisma from '../db/prismaClient';

class TransactionService {
	async create(data: CreateTransaction, accountId: number, userId: string) {

		const { date, amount, type, category, description } = data;

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
		const transaction = await prisma.transaction.delete({
			where: {
				id,
				accountId,
				userId,
			},
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
