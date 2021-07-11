import axiosClient from 'untils/axiosClient';

export const getDataChart = async () => {
	const { data } = await axiosClient.get('admin');
	return data;
};
