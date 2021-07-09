import { OrderTypes } from 'constants/types';

const initialState = {
	isLoading: false,
	notification: '',
	order: {},
	orders: [],
};

export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case OrderTypes.SET_IS_LOADING: {
			return { ...state, isLoading: true };
		}
		case OrderTypes.CREATE_ORDER_SUCCESS: {
			return {
				...state,
				order: { ...action.payload.order },
				isLoading: false,
				notification: 'checkoutSuccess',
			};
		}
		case OrderTypes.GET_ORDERS_BY_USER_SUCCESS: {
			return { ...state, orders: [...action.payload], isLoading: false };
		}
		case OrderTypes.CREATE_ORDER_FAIL: {
			return { ...state, isLoading: false, notification: 'checkoutFail' };
		}
		case OrderTypes.SET_NOTIFICATION_ORDER: {
			return { ...state, notification: '' };
		}
		default:
			return { ...state };
	}
};
