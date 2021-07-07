import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer';
import { productReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { orderReducer } from './orderReducer';

const appReducers = combineReducers({
	auth: authReducer,
	user: userReducer,
	productReducer: productReducer,
	cartReducer: cartReducer,
	orderReducer: orderReducer,
});

export default appReducers;
