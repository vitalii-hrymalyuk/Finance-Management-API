import dotenv from 'dotenv'

dotenv.config({})

export class Config {
	public PORT: string;
	public JWT_SECRET: string;

	constructor() {
		this.PORT = process.env.PORT || '3000';
		this.JWT_SECRET = process.env.JWT_SECRET || 'secret';
	}
}

export const config = new Config()