import { UserTypes } from 'constants/types';

export const actCreateUser = (user) => {
	return {
		type: UserTypes.CREATE,
		payload: user,
	};
};

export const actCreateUserSuccess = () => {
	return {
		type: UserTypes.CREATE_SUCCESS,
	};
};

export const actCreateUserFail = () => {
	return {
		type: UserTypes.CREATE_FAIL,
	};
};

export const actSetLoading = () => {
	return {
		type: UserTypes.SET_IS_LOADING,
	};
};

export const actClearNotification = () => {
	return {
		type: UserTypes.CLEAR_NOTIFICATION,
	};
};
