import { IUser } from '../common/types/auth.types'
import { config } from '../config';
import { userService } from './user.service';
import jwt from 'jsonwebtoken';

class AuthService {
	async signup(data: IUser) {
		const oldUser = await userService.getByEmail(data.email);
		if (oldUser) throw new Error('User already exists');

		const user = await userService.create(data);
		
		return user
	}

	async signJWT(id: string) {
		const token = jwt.sign(
			{
				userId: id,
			},
			config.JWT_SECRET,
			{ expiresIn: '3d' }
		)
		return token
	}
}

export const authService = new AuthService()
