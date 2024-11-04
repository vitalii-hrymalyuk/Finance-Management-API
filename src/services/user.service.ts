import { BadRequestError } from '../common/errors/BadRequestError';
import { NotFoundError } from '../common/errors/NotFoundError';
import { ICreateUser, IUpdateUser, User } from '../common/types/auth.types';
import prisma from '../db/prismaClient'
import * as bcrypt from 'bcryptjs'

class UserService {

	async create(data: ICreateUser) {

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(data.password, salt);

		return await prisma.user.create({
			data: {
				...data,
				password: hashedPassword
			}
		})
	}

	async update(id: string, data: IUpdateUser): Promise<Omit<User, 'password'>> {

		const user = await prisma.user.update({
			where: {
				id
			},
			data
		})

		const { password: _password, ...userWithoutPassword } = user;

		return userWithoutPassword;
	}

	async changePassword(id: string, newPassword: string): Promise<Omit<User, 'password'>> {

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);
		const isSamePassword = await bcrypt.compare(newPassword, hashedPassword);

		if (isSamePassword) {
			throw new BadRequestError('New password cannot be the same as old password');
		}
		const { password, ...user } = await prisma.user.update({
			where: {
				id
			},
			data: {
				password: hashedPassword
			}
		})
		return user
	}

	async getById(id: string): Promise<User | null> {
		return await prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	async getByEmail(email: string) {
		return await prisma.user.findUnique({
			where: {
				email
			},
			include: {
				accounts: true,
				transactions: true,
				budgets: true,
			},
		})
	}

	async getUserProfile(id: string) {
		const user = await this.getById(id);

		if (!user) throw new NotFoundError('User not found');

		const { password, ...userWithoutPassword } = user;

		return {
			...userWithoutPassword,
			accounts: user.accounts || [],
			transactions: user.transactions || [],
			budgets: user.budgets || [],
		};
	}
}

export const userService = new UserService();