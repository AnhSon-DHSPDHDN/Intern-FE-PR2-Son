import { ProductTypes } from 'constants/types';

export const actGetProductsHome = () => {
	return {
		type: ProductTypes.GET_PRODUCT_HOME,
	};
};

export const actGetProductsHomeSuccess = (payload) => {
	return {
		type: ProductTypes.GET_PRODUCT_HOME_SUCCESS,
		payload: payload,
	};
};

export const actSetLoading = () => {
	return {
		type: ProductTypes.SET_IS_LOADING,
	};
};

export const actGetProductsPage = (payload) => {
	return {
		type: ProductTypes.GET_PRODUCT,
		payload: payload,
	};
};

export const actGetProductsPageSuccess = (payload) => {
	return {
		type: ProductTypes.GET_PRODUCT_SUCCESS,
		payload: payload,
	};
};

export const actChangePageProduct = (payload) => {
	return {
		type: ProductTypes.CHANGE_PAGE_PRODUCT,
		payload: payload,
	};
};

export const actChangePageProductSuccess = (payload) => {
	return {
		type: ProductTypes.CHANGE_PAGE_PRODUCT_SUCCESS,
		payload: payload,
	};
};

export const actFiltersProduct = (payload) => {
	return {
		type: ProductTypes.FILTER_PRODUCT,
		payload: payload,
	};
};

export const actFiltersProductSuccess = (payload) => {
	return {
		type: ProductTypes.FILTER_PRODUCT_SUCCESS,
		payload: payload,
	};
};

export const actGetProductById = (payload) => {
	return {
		type: ProductTypes.GET_PRODUCT_BY_ID,
		payload: payload,
	};
};

export const actGetProductByIdSuccess = (payload) => {
	return {
		type: ProductTypes.GET_PRODUCT_BY_ID_SUCCESS,
		payload: payload,
	};
};

export const actGetProductByIdFail = () => {
	return {
		type: ProductTypes.GET_PRODUCT_BY_ID_FAIL,
	};
};
