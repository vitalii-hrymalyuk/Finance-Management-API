import dotenv from 'dotenv'

dotenv.config({})

export class Config {
	public PORT: string;

	constructor() {
		this.PORT = process.env.PORT || '3000';
	}
}

export const config = new Config()