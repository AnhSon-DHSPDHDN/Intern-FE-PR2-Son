import { call, put, takeLeading } from '@redux-saga/core/effects';
import { createUser } from 'apis/usersApi';
import { UserTypes } from 'constants/types';
import {
	actCreateUserFail,
	actCreateUserSuccess,
	actSetLoading,
	actClearNotification,
} from 'redux/actions/userAction';

function* onCreateUser({ payload }) {
	yield put(actSetLoading());
	try {
		const res = yield call(createUser, payload);
		if (res.status === 201) {
			yield put(actCreateUserSuccess());
		} else throw new Error();
	} catch (error) {
		yield put(actCreateUserFail());
	} finally {
		yield put(actClearNotification());
	}
}

function* watchCreateUser() {
	yield takeLeading(UserTypes.CREATE, onCreateUser);
}

// eslint-disable-next-line
export default [watchCreateUser()];
