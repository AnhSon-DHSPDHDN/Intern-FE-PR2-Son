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

export const deleteProductById = (id) => {
	return axiosClient.delete(`products/${id}`);
};

export const createProduct = async (product) => {
	const res = await axiosClient.post('products', { ...product });
	return res;
};

export const updateProduct = async (id, product) => {
	const res = await axiosClient.put(`products/${id}`, { ...product });
	return res;
};
