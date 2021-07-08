import { call, put, takeEvery, takeLeading } from '@redux-saga/core/effects';
import { getProductById, getProducts } from 'apis/productsApi';
import { ProductTypes } from 'constants/types';
import {
	actGetProductsHomeSuccess,
	actSetLoading,
	actGetProductsPageSuccess,
	actChangePageProductSuccess,
	actFiltersProductSuccess,
	actGetProductByIdFail,
	actGetProductByIdSuccess,
} from 'redux/actions/productAction';

function* getProductsHome() {
	yield put(actSetLoading());
	const [resProductNew, resProductSale] = yield Promise.all([
		getProducts({ tags_like: 'new' }),
		getProducts({ tags_like: 'sale' }),
	]);
	yield put(
		actGetProductsHomeSuccess({
			productNew: resProductNew.data,
			productSale: resProductSale.data,
		})
	);
}

function* getProductsPage({ payload }) {
	yield put(actSetLoading());
	const resProducts = yield call(getProducts, { ...payload });
	yield put(
		actGetProductsPageSuccess({
			products: resProducts.data,
			totalProducts: resProducts.headers['x-total-count'],
		})
	);
}

function* onChangePage({ payload }) {
	yield put(actSetLoading());
	const resProducts = yield call(getProducts, { ...payload });
	yield put(
		actChangePageProductSuccess({
			products: resProducts.data,
			totalProducts: resProducts.headers['x-total-count'],
			pagination: payload,
		})
	);
}

function* filterProductPage({ payload }) {
	yield put(actSetLoading());
	const resProducts = yield call(getProducts, { ...payload });
	yield put(
		actFiltersProductSuccess({
			products: resProducts.data,
			totalProducts: resProducts.headers['x-total-count'],
		})
	);
}

function* getProductId({ payload }) {
	yield put(actSetLoading());
	try {
		const product = yield call(getProductById, payload);
		yield put(actGetProductByIdSuccess(product));
	} catch (error) {
		yield put(actGetProductByIdFail());
	}
}

function* watchGetProductId() {
	yield takeEvery(ProductTypes.GET_PRODUCT_BY_ID, getProductId);
}

function* watchFilterProductPage() {
	yield takeEvery(ProductTypes.FILTER_PRODUCT, filterProductPage);
}

function* watchOnChangePage() {
	yield takeLeading(ProductTypes.CHANGE_PAGE_PRODUCT, onChangePage);
}

function* watchGetProductsPage() {
	yield takeLeading(ProductTypes.GET_PRODUCT, getProductsPage);
}

function* watchGetProductHome() {
	yield takeEvery(ProductTypes.GET_PRODUCT_HOME, getProductsHome);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
	watchGetProductHome(),
	watchGetProductsPage(),
	watchOnChangePage(),
	watchFilterProductPage(),
	watchGetProductId(),
];
