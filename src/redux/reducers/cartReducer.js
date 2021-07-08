import { CartTypes } from 'constants/types';

const initialState = {
	flagCart: 0,
	cart: [],
};

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case CartTypes.ADD_TO_CART_SUCCESS: {
			const product = action.payload;
			const cart = JSON.parse(localStorage.getItem('cart')) || [];
			const indexProduct = cart.findIndex((cart) => cart.id === product.id);
			if (indexProduct !== -1) {
				cart[indexProduct].quantity += 1;
			} else {
				cart.push({ ...product, quantity: 1 });
			}
			localStorage.setItem('cart', JSON.stringify(cart));
			return { flagCart: cart.length, cart: cart };
		}
		case CartTypes.ADD_MORE_TO_CART_SUCCESS: {
			const { product, chooseQuantity } = action.payload;
			const cart = JSON.parse(localStorage.getItem('cart')) || [];
			const indexProduct = cart.findIndex((cart) => cart.id === product.id);
			if (indexProduct !== -1) {
				cart[indexProduct].quantity += chooseQuantity;
			} else {
				cart.push({ ...product, quantity: chooseQuantity });
			}
			localStorage.setItem('cart', JSON.stringify(cart));
			return { flagCart: cart.length, cart: cart };
		}
		case CartTypes.CHANGE_QUANTITY_CART_SUCESS: {
			const cart = JSON.parse(localStorage.getItem('cart')) || [];
			const indexChange = cart.findIndex(
				(cart) => cart.id === action.payload.id
			);
			cart[indexChange].quantity = action.payload.quantity;
			localStorage.setItem('cart', JSON.stringify(cart));
			return { ...state, cart: cart };
		}
		case CartTypes.REMOVE_TO_CART_SUCESS: {
			const cart = JSON.parse(localStorage.getItem('cart')) || [];
			const indexDelete = cart.findIndex(
				(cart) => cart.id === action.payload.id
			);
			cart.splice(indexDelete, 1);
			localStorage.setItem('cart', JSON.stringify(cart));
			return { flagCart: cart.length, cart: cart };
		}
		case CartTypes.CLEAR_ALL_CART_SUCCESS: {
			localStorage.removeItem('cart');
			return { flagCart: 0, cart: [] };
		}
		default: {
			const cart = JSON.parse(localStorage.getItem('cart')) || [];
			return { flagCart: cart.length, cart: cart };
		}
	}
};
