import { logIn } from 'apis/authApi';
import { getUserByUsername } from 'apis/usersApi';
import { AuthTypes } from 'constants/types';
import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import {
	actGetProfileFail,
	actGetProfileSuccess,
	actLoginFail,
	actLoginSuccess,
	actSetLoadingSuccess,
} from 'redux/actions/authAction';
import jwt from 'jsonwebtoken';

function* login({ payload }) {
	yield put(actSetLoadingSuccess());
	try {
		const { username, password } = payload;
		const token = yield call(logIn, username, password);
		const profile = yield call(getUserByUsername, username);
		yield put(actLoginSuccess({ token, profile }));
	} catch (error) {
		yield put(actLoginFail());
	}
}

function* getProfile({ payload }) {
	try {
		const token = payload;
		const decodeToken = yield jwt.decode(token);
		const username = decodeToken?.email.split('@')[0];
		const profile = yield call(getUserByUsername, username);
		yield put(actGetProfileSuccess({ profile }));
	} catch (error) {
		yield put(actGetProfileFail());
	}
}

function* watchLogin() {
	yield takeLeading(AuthTypes.LOGIN, login);
}

function* watchGetProfile() {
	yield takeEvery(AuthTypes.GET_PROFILE, getProfile);
}

// eslint-disable-next-line
export default [watchLogin(), watchGetProfile()];
