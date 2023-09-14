export const load = async ({ cookies, locals }) => {
	const token = cookies.get('token');

	const user = locals.user;

	return { user, token };
};
