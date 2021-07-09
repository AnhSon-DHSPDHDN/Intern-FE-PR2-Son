import { ProductTypes } from 'constants/types';

const initialState = {
	isLoading: false,
	status: '',
	product: {},
	productInPage: [],
	productSales: [],
	productNews: [],
	filter: {},
	pagination: {},
};

export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case ProductTypes.GET_PRODUCT_HOME_SUCCESS: {
			return {
				...state,
				productNews: action.payload.productNew,
				productSales: action.payload.productSale,
				isLoading: false,
			};
		}
		case ProductTypes.GET_PRODUCT_SUCCESS: {
			return {
				...state,
				productInPage: action.payload.products,
				isLoading: false,
				pagination: {
					...state.pagination,
					currentPage: 1,
					total: action.payload.totalProducts,
				},
			};
		}
		case ProductTypes.CHANGE_PAGE_PRODUCT_SUCCESS: {
			return {
				...state,
				productInPage: action.payload.products,
				isLoading: false,
				pagination: {
					...state.pagination,
					currentPage: action.payload.pagination._page,
					total: action.payload.totalProducts,
				},
			};
		}
		case ProductTypes.FILTER_PRODUCT_SUCCESS: {
			return {
				...state,
				productInPage: action.payload.products,
				isLoading: false,
				pagination: {
					...state.pagination,
					currentPage: 1,
					total: action.payload.totalProducts,
				},
			};
		}
		case ProductTypes.GET_PRODUCT_BY_ID_SUCCESS: {
			return { ...state, isLoading: false, product: { ...action.payload } };
		}
		case ProductTypes.GET_PRODUCT_BY_ID_FAIL: {
			window.location.href = '/';
			return { ...state, isLoading: false };
		}
		case ProductTypes.SET_IS_LOADING: {
			return { ...state, isLoading: true };
		}
		default:
			return { ...state };
	}
};
