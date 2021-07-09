import { OrderTypes } from 'constants/types';

export const actCreateOrder = (payload) => {
	return {
		type: OrderTypes.CREATE_ORDER,
		payload: payload,
	};
};

export const actCreateOrderSuccess = (payload) => {
	return {
		type: OrderTypes.CREATE_ORDER_SUCCESS,
		payload: payload,
	};
};

export const actCreateOrderFail = (payload) => {
	return {
		type: OrderTypes.CREATE_ORDER_FAIL,
	};
};

export const actSetLoading = () => {
	return {
		type: OrderTypes.SET_IS_LOADING,
	};
};

export const actSetNotification = () => {
	return {
		type: OrderTypes.SET_NOTIFICATION_ORDER,
	};
};

export const actGetOrderUser = (payload) => {
	return {
		type: OrderTypes.GET_ORDERS_BY_USER,
		payload: payload,
	};
};

export const actGetOrderUserSuccess = (payload) => {
	return {
		type: OrderTypes.GET_ORDERS_BY_USER_SUCCESS,
		payload: payload,
	};
};
