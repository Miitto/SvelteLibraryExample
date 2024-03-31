import { prisma } from '$lib/database.server';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	let authors = await prisma.author.findMany();

	return {
		authors
	};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		try {
			const author = await prisma.author.create({
				data: {
					name: data.get('name') as string
				}
			});
		} catch (error: any) {
			console.error(error);
			return {
				success: false
			};
		}

		return {
			success: true
		};
	}
} satisfies Actions;
