import axiosClient from 'untils/axiosClient';

export const getProducts = async (params) => {
	const res = await axiosClient.get('products', {
		params: params,
	});
	return res;
};

export const getProductById = async (id) => {
	const { data } = await axiosClient.get(`products/${id}`);
	return data;
};
