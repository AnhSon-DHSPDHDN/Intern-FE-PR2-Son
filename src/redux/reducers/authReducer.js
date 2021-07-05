import { AuthTypes } from 'constants/types';

const initialState = {
	profile: {},
	isLoggIn: false,
	isAuthenticated: false,
	isLoading: false,
	notif: '',
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case AuthTypes.LOGIN_SUCCESS: {
			const profile = action.payload.profile;
			const { accessToken } = action.payload.token;
			localStorage.setItem('accessToken', accessToken);
			state = {
				profile: profile,
				isLoggIn: true,
				isAuthenticated: profile.isAdmin,
				isLoading: false,
				notif: 'loginSucess',
			};
			return { ...state };
		}
		case AuthTypes.GET_PROFILE_SUCCESS: {
			const profile = action.payload.profile;
			state = {
				...state,
				profile: profile,
				isLoggIn: true,
				isAuthenticated: profile.isAdmin,
			};
			return { ...state };
		}
		case AuthTypes.LOGOUT: {
			localStorage.removeItem('accessToken');
			return { ...initialState };
		}
		case AuthTypes.GET_PROFILE_FAIL: {
			return { ...initialState };
		}
		case AuthTypes.LOGIN_FAIL: {
			return { ...state, isLoading: false, notif: 'loginFail' };
		}
		case AuthTypes.SET_IS_LOADING: {
			return { ...state, isLoading: true };
		}
		default:
			return { ...state };
	}
};
