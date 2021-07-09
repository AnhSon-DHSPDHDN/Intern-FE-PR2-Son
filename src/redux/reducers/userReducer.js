import { UserTypes } from 'constants/types';

const initialState = {
	isLoading: false,
	status: '',
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case UserTypes.CREATE_SUCCESS: {
			return { status: 'registerSucess', isLoading: false };
		}
		case UserTypes.CREATE_FAIL: {
			return { status: 'registerFail', isLoading: false };
		}
		case UserTypes.UPDATE_USER_SUCCESS: {
			return { status: 'updateSuccess', isLoading: false };
		}
		case UserTypes.UPDATE_USER_FAIL: {
			return { status: 'updateFail', isLoading: false };
		}
		case UserTypes.SET_IS_LOADING: {
			return { ...state, isLoading: true };
		}
		case UserTypes.CLEAR_NOTIFICATION: {
			return { ...initialState };
		}
		default:
			return { ...state };
	}
};
