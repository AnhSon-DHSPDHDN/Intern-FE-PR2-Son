import { CartTypes } from 'constants/types';

export const actAddToCartSuccess = (payload) => {
	return {
		type: CartTypes.ADD_TO_CART_SUCCESS,
		payload: payload,
	};
};

export const actAddMoreToCartSuccess = (payload) => {
	return {
		type: CartTypes.ADD_MORE_TO_CART_SUCCESS,
		payload: payload,
	};
};

export const actRemoveToCartSuccess = (payload) => {
	return {
		type: CartTypes.REMOVE_TO_CART_SUCESS,
		payload: payload,
	};
};

export const actChangeCartSuccess = (payload) => {
	return {
		type: CartTypes.CHANGE_QUANTITY_CART_SUCESS,
		payload: payload,
	};
};

export const actClearAllCart = () => {
	return {
		type: CartTypes.CLEAR_ALL_CART_SUCCESS,
	};
};
