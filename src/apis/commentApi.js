import axiosClient from 'untils/axiosClient';

export const createCommentApi = async (payload) => {
	const { data } = await axiosClient.post('comments', { ...payload });
	return data;
};

export const getCommentByProduct = async (idProduct) => {
	const { data } = await axiosClient.get('comments', {
		params: { idProduct: idProduct },
	});
	return data;
};
