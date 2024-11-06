import { CreateBudget, UpdateBudget } from '../common/types';
import prisma from '../db/prismaClient';

class BudgetService {

	async create(data: CreateBudget, userId: string) {

		const createData = {
			category: data.category,
			amount: data.amount,
			startDate: new Date(data.startDate),
			endDate: new Date(data.endDate)
		}

		const budget = await prisma.budget.create({
			data: {
				...createData,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
		return budget
	}

	async getAll(userId: string) {
		const budgets = await prisma.budget.findMany({
			where: {
				userId
			}
		})
		return budgets
	}

	async update(id: number, userId: string, data: UpdateBudget) {

		const budget = await prisma.budget.update({
			where: {
				id,
				userId
			},
			data: {
				...data
			}
		})
		return budget
	}

	async delete(id: number, userId: string) {
		const budget = await prisma.budget.delete({
			where: {
				id,
				userId
			}
		})
		return budget
	}
}

export const budgetService = new BudgetService();