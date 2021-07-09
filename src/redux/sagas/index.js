import { all } from '@redux-saga/core/effects';
import authSaga from './auth';
import userSaga from './userSaga';
import productSaga from './productSaga';
import orderSaga from './orderSaga';
import commentSaga from './commentSaga';

function* rootSaga() {
	yield all([
		...authSaga,
		...userSaga,
		...productSaga,
		...orderSaga,
		...commentSaga,
	]);
}

export default rootSaga;
