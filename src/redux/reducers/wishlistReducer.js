import { WishlishTypes } from 'constants/types';

const initialState = {
	flagWishlist: 0,
	wishlist: [],
};

export const wistlistReducer = (state = initialState, action) => {
	switch (action.type) {
		case WishlishTypes.ADD_TO_WISHLISH_SUCCESS: {
			const product = action.payload;
			const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
			const indexProduct = wishlist.findIndex(
				(wishlist) => wishlist.id === product.id
			);
			if (indexProduct !== -1) {
				localStorage.setItem('wishlist', JSON.stringify(wishlist));
				return { flagWishlist: wishlist.length, wishlist: wishlist };
			} else {
				wishlist.push({ ...product });
			}
			localStorage.setItem('wishlist', JSON.stringify(wishlist));
			return { flagWishlist: wishlist.length, wishlist: wishlist };
		}
		case WishlishTypes.REMOVE_TO_WISH_SUCESS: {
			const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
			const indexDelete = wishlist.findIndex(
				(wishlist) => wishlist.id === action.payload.id
			);
			wishlist.splice(indexDelete, 1);
			localStorage.setItem('wishlist', JSON.stringify(wishlist));
			return { flagWishlist: wishlist.length, wishlist: wishlist };
		}
		default: {
			const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
			return { flagWishlist: wishlist.length, wishlist: wishlist };
		}
	}
};
