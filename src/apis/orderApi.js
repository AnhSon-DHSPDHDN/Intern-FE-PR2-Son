import axiosClient from 'untils/axiosClient';

export const createOrderApi = async (payload) => {
	const res = await axiosClient.post('orders', { ...payload });
	return res;
};
