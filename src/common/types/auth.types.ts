import { JwtPayload } from 'jsonwebtoken';
import { Account, Budget, Transaction } from '.';
export type User = {
	id: string;
	username: string;
	email: string;
	password: string;
	accounts?: Account[];
	transactions?: Transaction[];
	budgets?: Budget[];
};

export interface CustomJwtPayload extends JwtPayload {
	userId: string;
}

type IUpdateUser = Partial<Omit<User, 'id' | 'password' | 'transactions' | 'accounts' | 'budgets'>>
type UserResponse = { user: Omit<User, 'password'>; token: string };
type ICreateUser = Omit<User, 'id' | 'transactions' | 'accounts' | 'budgets'>

export { User as IUser, UserResponse, IUpdateUser, ICreateUser }