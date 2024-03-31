import { prisma } from '$lib/database.server';
import { json } from '@sveltejs/kit';

export const DELETE = async ({ params }) => {
	try {
		await prisma.loan.update({
			where: {
				id: params.id
			},
			data: {
				returned: true
			}
		});
	} catch {
		return json({ success: false });
	}
	return json({ success: true });
};
