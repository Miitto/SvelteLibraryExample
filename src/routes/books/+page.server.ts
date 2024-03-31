import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/database.server';

export const load: PageServerLoad = async () => {
	let books = await prisma.book.findMany({
		include: {
			author: true
		}
	});

	let authors = await prisma.author.findMany();

	return {
		books,
		authors
	};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		try {
			const book = await prisma.book.create({
				data: {
					title: data.get('title') as string,
					authorId: data.get('author') as string,
					description: data.get('description') as string
				}
			});
		} catch (error: any) {
			console.error(error);
			return {
				success: false
			};
		}
	}
} satisfies Actions;
