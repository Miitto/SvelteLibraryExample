import { prisma } from '$lib/database.server';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	let users = await prisma.user.findMany();

	return {
		users
	};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		try {
			const user = await prisma.user.create({
				data: {
					email: data.get('email') as string,
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
