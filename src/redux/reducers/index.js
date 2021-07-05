import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer';

const appReducers = combineReducers({
	auth: authReducer,
	user: userReducer,
});

export default appReducers;
