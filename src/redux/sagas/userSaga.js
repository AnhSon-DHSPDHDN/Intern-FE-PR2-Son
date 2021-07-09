import { call, put, takeLatest, takeLeading } from '@redux-saga/core/effects';
import { createUser, updateUser } from 'apis/usersApi';
import { UserTypes } from 'constants/types';
import { actGetProfileSuccess } from 'redux/actions/authAction';
import {
	actCreateUserFail,
	actCreateUserSuccess,
	actSetLoading,
	actClearNotification,
	actUpdateUserSuccess,
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

function* onUpdateUser({ payload }) {
	yield put(actSetLoading());
	try {
		const id = payload.id;
		const user = payload.payload;
		const res = yield call(updateUser, id, user);
		if (res.status === 200) {
			const profile = res.data;
			yield put(actUpdateUserSuccess());
			yield put(actGetProfileSuccess({ profile }));
		} else throw new Error();
	} catch (error) {
	} finally {
		yield put(actClearNotification());
	}
}

function* watchOnUpdateUser() {
	yield takeLatest(UserTypes.UPDATE_USER, onUpdateUser);
}

function* watchCreateUser() {
	yield takeLeading(UserTypes.CREATE, onCreateUser);
}

// eslint-disable-next-line
export default [watchCreateUser(), watchOnUpdateUser()];
