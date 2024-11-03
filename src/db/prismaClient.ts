import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

process.on('SIGINT', async () => {
	await prisma.$disconnect();
	process.exit();
});

process.on('SIGTERM', async () => {
	await prisma.$disconnect();
	process.exit();
});

export default prisma;