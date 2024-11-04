import { CreateAccount } from '../common/types';
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
}

export const accountService = new AccountService()