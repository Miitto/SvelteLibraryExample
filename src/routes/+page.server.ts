import { prisma } from '$lib/database.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	let loanedBooks = await prisma.loan.findMany({
		where: {
			returned: false,
			dueDate: {
				gte: new Date()
			}
		},
		include: {
			book: {
				include: {
					author: true
				}
			}
		}
	});

	let lateBooks = await prisma.loan.findMany({
		where: {
			returned: false,
			dueDate: {
				lt: new Date()
			}
		},
		include: {
			book: {
				include: {
					author: true
				}
			}
		}
	});

	let books = await prisma.book.findMany({
		include: {
			author: true
		}
	});

	let users = await prisma.user.findMany();

	return {
		loanedBooks,
		lateBooks,
		books,
		users
	};
};
