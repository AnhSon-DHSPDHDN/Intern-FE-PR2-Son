import { all } from '@redux-saga/core/effects';
import authSaga from './auth';
import userSaga from './userSaga';
import productSaga from './productSaga';
import orderSaga from './orderSaga';

function* rootSaga() {
	yield all([...authSaga, ...userSaga, ...productSaga, ...orderSaga]);
}

export default rootSaga;
