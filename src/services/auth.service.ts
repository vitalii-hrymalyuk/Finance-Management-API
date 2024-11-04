import { BadRequestError } from '../common/errors/BadRequestError';
import { NotFoundError } from '../common/errors/NotFoundError';
import { IUser, UserResponse } from '../common/types/auth.types'
import { signJWT } from '../utils/jwt.utils';
import { userService } from './user.service';
import * as bcrypt from 'bcryptjs'

class AuthService {
	async signup(data: IUser): Promise<UserResponse> {

		const oldUser = await userService.getByEmail(data.email);
		if (oldUser) throw new BadRequestError('User already exists');

		const user = await userService.create(data);
		const { password: _password, ...userWithoutPassword } = user;
		const token = signJWT(user.id);

		return { user: userWithoutPassword, token }
	}

	async login(email: string, password: string): Promise<string> {
		const user = await userService.getByEmail(email);
		if (!user) throw new NotFoundError('User not found');

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) throw new BadRequestError('Invalid credentials');
		const token = signJWT(user.id);
		return token;
	}

}

export const authService = new AuthService()
