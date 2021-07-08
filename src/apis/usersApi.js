import axiosClient from 'untils/axiosClient';

export const getUserById = async (id) => {
	const { data } = await axiosClient.get('users', {
		params: { id: id },
	});
	return data;
};

export const getUserByUsername = async (username) => {
	const { data } = await axiosClient.get('users', {
		params: { email: `${username}@gmail.com` },
	});
	return data[0];
};

export const createUser = async (user) => {
	const res = await axiosClient.post('users', {
		...user,
		email: `${user.email}@gmail.com`,
	});
	return res;
};

export const updateUser = async (id, user) => {
	const res = await axiosClient.put(`users/${id}`, {
		...user,
		email: `${user.email}@gmail.com`,
	});
	return res;
};
