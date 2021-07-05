import { AuthTypes } from 'constants/types';

export const actLogin = (payload) => {
	return {
		type: AuthTypes.LOGIN,
		payload: payload,
	};
};

export const actLoginFail = () => {
	return {
		type: AuthTypes.LOGIN_FAIL,
	};
};

export const actSetLoadingSuccess = () => {
	return {
		type: AuthTypes.SET_IS_LOADING,
	};
};

export const actLoginSuccess = (payload) => {
	return {
		type: AuthTypes.LOGIN_SUCCESS,
		payload: payload,
	};
};

export const actGetProfile = (payload) => {
	return {
		type: AuthTypes.GET_PROFILE,
		payload: payload,
	};
};

export const actGetProfileSuccess = (payload) => {
	return {
		type: AuthTypes.GET_PROFILE_SUCCESS,
		payload: payload,
	};
};

export const actGetProfileFail = () => {
	return {
		type: AuthTypes.GET_PROFILE_FAIL,
	};
};

export const actLogout = () => {
	return {
		type: AuthTypes.LOGOUT,
	};
};
