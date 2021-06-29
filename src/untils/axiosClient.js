import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_BASE_BE,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (param) => queryString.stringify(param),
});

export default axiosClient;
