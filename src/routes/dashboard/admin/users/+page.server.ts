import { HTTP } from '$lib/axios';
import { transformObject } from '$lib/utils';
import { fail } from '@sveltejs/kit';

export async function load() {
	const rsp = await HTTP.get('/admin/get-all-users/');

	const allUsers = transformObject(rsp.data) as User[];

	return { users: allUsers };
}

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const user_id = form.get('user_id');

		if (!user_id) return fail(400, { message: 'Invalid user_id' });

		try {
			await HTTP.post('/admin/delete-user/', { user_id });
			return { status: 200 };
		} catch (err: any) {
			return fail(400, err.response.data);
		}
	}
};
