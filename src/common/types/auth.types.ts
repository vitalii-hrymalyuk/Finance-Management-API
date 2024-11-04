import { JwtPayload } from 'jsonwebtoken';

interface IUser {
	id?: string
	username: string
	email: string
	password: string
}

export interface CustomJwtPayload extends JwtPayload {
	userId: string;
}

type IUpdateUser = Partial<Omit<IUser, 'id' | 'password'>>
type UserResponse = { user: Omit<IUser, 'password'>; token: string };

export { IUser, UserResponse, IUpdateUser }