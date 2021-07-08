import { WishlishTypes } from 'constants/types';

export const actAddWishlistSuccess = (payload) => {
	return {
		type: WishlishTypes.ADD_TO_WISHLISH_SUCCESS,
		payload: payload,
	};
};

export const actRemoveWishlistSuccess = (payload) => {
	return {
		type: WishlishTypes.REMOVE_TO_WISH_SUCESS,
		payload: payload,
	};
};
