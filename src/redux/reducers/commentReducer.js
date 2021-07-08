import { CommentTypes } from 'constants/types';

const initialState = {
	isLoading: false,
	comments: [],
};

export const commentReducer = (state = initialState, action) => {
	switch (action.type) {
		case CommentTypes.GET_COMMENT_BY_PRODUCT_SUCCESS: {
			return { ...state, isLoading: false, comments: [...action.payload] };
		}
		case CommentTypes.SET_IS_LOADING: {
			return { ...state, isLoading: true };
		}
		default:
			return { ...state };
	}
};
