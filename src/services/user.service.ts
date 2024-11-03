import { IUser } from '../common/types/auth.types';
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