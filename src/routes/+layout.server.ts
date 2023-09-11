import { HTTP } from '$lib/axios';

export const load = async ({ cookies }) => {
	if (!HTTP.defaults.headers.common['Authorization']) {
		return;
	}
	const profile = await HTTP.get('/get-user-profile/');
	if (profile.status !== 200) {
		return;
	}
	const user = profile.data;
	const token = cookies.get('token');
	return { user, token };
};
