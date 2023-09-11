export const load = async ({ cookies, fetch }) => {
	const token = cookies.get('token');
	if (!token) {
		return;
	}

	const profile = await fetch('/get-user-profile/');

	if (profile.status !== 200) {
		return;
	}

	const user = profile.json();

	return { user, token };
};
