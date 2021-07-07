import { call, put, takeLatest } from '@redux-saga/core/effects';
import { createOrderApi } from 'apis/orderApi';
import { OrderTypes } from 'constants/types';
import {
	actCreateOrderFail,
	actCreateOrderSuccess,
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

function* watchCreateOrder() {
	yield takeLatest(OrderTypes.CREATE_ORDER, createOrder);
}

// eslint-disable-next-line
export default [watchCreateOrder()];