import { transformObject } from '$lib/utils';
import { fail } from '@sveltejs/kit';

export async function load({ fetch }) {
	const rsp = await fetch('/admin/get-all-users/');

	const allUsers = transformObject(await rsp.json()) as User[];

	return { users: allUsers };
}

export const actions = {
	default: async ({ request, fetch }) => {
		const form = await request.formData();
		const user_id = form.get('user_id');

		if (!user_id) return fail(400, { message: 'Invalid user_id' });

		const rsp = await fetch('/admin/delete-user/', {
			method: 'POST',
			body: JSON.stringify({ user_id }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (rsp.status !== 200) return fail(400, { message: 'Something went wrong' });

		return { status: 200 };
	}
};
