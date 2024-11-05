import { CreateAccount, UpdateAccount } from '../common/types';
import prisma from '../db/prismaClient';

class AccountService {
	async create(data: CreateAccount, userId: string) {
		const account = await prisma.account.create({
			data: {
				...data,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
		return account
	}

	async getUserAccounts(userId: string) {
		const accounts = await prisma.account.findMany({
			where: {
				userId
			}
		})
		return accounts
	}

	async updateUserAccount(id: number, data: UpdateAccount) {
		const account = await prisma.account.update({
			where: {
				id
			},
			data
		})
		return account
	}

	async deleteAccount(id: number) {
		const account = await prisma.account.delete({
			where: {
				id
			}
		})
		return account
	}

}

export const accountService = new AccountService()