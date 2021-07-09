import axiosClient from 'untils/axiosClient';

export const createOrderApi = async (payload) => {
	const res = await axiosClient.post('orders', { ...payload });
	return res;
};

export const getOrderByUser = async (id) => {
	const { data } = await axiosClient.get('orders', {
		params: { idUser: id, _sort: 'createAt', _order: 'desc' },
	});
	return data;
};
