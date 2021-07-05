import { all } from '@redux-saga/core/effects';
import authSaga from './auth';
import userSaga from './userSaga';

function* rootSaga() {
	yield all([...authSaga, ...userSaga]);
}

export default rootSaga;
