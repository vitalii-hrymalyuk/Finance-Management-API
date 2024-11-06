import { User } from './auth.types';
import { TransactionType } from '@prisma/client'

export enum TransactionTypeCustom {
	EXPENSE = "expense",
	INCOME = "income",
	TRANSFER = "transfer",
}

export enum AccountType {
	BANK = "BANK",
	CREDIT_CARD = "CREDIT_CARD",
	CASH = "CASH",
}

export enum Category {
	FOOD = "FOOD",
	UTILITIES = "UTILITIES",
	ENTERTAINMENT = "ENTERTAINMENT",
	TRANSPORTATION = "TRANSPORTATION",
	HEALTH = "HEALTH",
	SAVINGS = "SAVINGS",
	OTHER = "OTHER",
}

export type Account = {
	id: number;
	name: string;
	type: AccountType;
	balance: number;
	transactions?: Transaction[];
	userId: string;
	user?: User;
};

export interface CreateAccount extends Pick<Account, 'name' | 'type' | 'balance'> { }

export interface UpdateAccount extends Partial<Omit<Account, 'userId' | 'id' | 'user' | 'transactions'>> { }

export interface CreateTransaction extends Omit<Transaction, 'id' | 'accountId' | 'userId' | 'account' | 'user'> { }

export interface UpdateTransaction extends Partial<CreateTransaction> { }

export type Transaction = {
	id: number;
	amount: number;
	date: Date;
	type: TransactionType;
	category: string;
	description?: string;
	accountId: number;
	account?: Account;
	userId: string;
	user?: User;
};

export type Budget = {
	id: number;
	category: Category;
	amount: number;
	startDate: Date;
	endDate: Date;
	userId: string;
	user?: User;
};

export interface ErrorResponse {
	message: string;
}