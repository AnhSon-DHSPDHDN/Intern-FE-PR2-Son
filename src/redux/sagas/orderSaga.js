import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { createOrderApi, getOrderByUser } from 'apis/orderApi';
import { OrderTypes } from 'constants/types';
import {
	actCreateOrderFail,
	actCreateOrderSuccess,
	actGetOrderUserSuccess,
	actSetLoading,
	actSetNotification,
} from 'redux/actions/orderAction';
import { actClearAllCart } from 'redux/actions/cartAction';

function* createOrder({ payload }) {
	yield put(actSetLoading());
	try {
		const resOrder = yield call(createOrderApi, payload);
		if (resOrder.status === 201) {
			yield put(
				actCreateOrderSuccess({
					order: resOrder.data,
				})
			);
			yield put(actClearAllCart());
		} else throw new Error();
	} catch (error) {
		yield put(actCreateOrderFail());
	} finally {
		yield put(actSetNotification());
	}
}

function* onGetOrderUser({ payload }) {
	yield put(actSetLoading());
	const orders = yield call(getOrderByUser, payload);
	yield put(actGetOrderUserSuccess(orders));
}

function* watchGetOrderUser() {
	yield takeEvery(OrderTypes.GET_ORDERS_BY_USER, onGetOrderUser);
}

function* watchCreateOrder() {
	yield takeLatest(OrderTypes.CREATE_ORDER, createOrder);
}

// eslint-disable-next-line
export default [watchCreateOrder(), watchGetOrderUser()];