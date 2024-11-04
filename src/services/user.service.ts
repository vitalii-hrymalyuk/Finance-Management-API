import { BadRequestError } from '../common/errors/BadRequestError';
import { IUpdateUser, IUser } from '../common/types/auth.types';
import prisma from '../db/prismaClient'
import * as bcrypt from 'bcryptjs'

class UserService {

	async create(data: IUser) {

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(data.password, salt);

		return await prisma.user.create({
			data: {
				...data,
				password: hashedPassword
			}
		})
	}

	async update(id: string, data: IUpdateUser): Promise<Omit<IUser, 'password'>> {

		const user = await prisma.user.update({
			where: {
				id
			},
			data
		})

		const { password: _password, ...userWithoutPassword } = user;

		return userWithoutPassword;
	}

	async changePassword(id: string, newPassword: string): Promise<Omit<IUser, 'password'>> {

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

	async getById(id: string) {
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
			}
		})
	}
}

export const userService = new UserService();