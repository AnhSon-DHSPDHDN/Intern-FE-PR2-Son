import { CommentTypes } from 'constants/types';

export const actCreateComment = (payload) => {
	return {
		type: CommentTypes.CREATE_COMMENT,
		payload: payload,
	};
};

export const actCreateCommentSuccess = (payload) => {
	return {
		type: CommentTypes.CREATE_COMMENT_SUCCESS,
		payload: payload,
	};
};

export const actGetComment = (payload) => {
	return {
		type: CommentTypes.GET_COMMENT_BY_PRODUCT,
		payload: payload,
	};
};

export const actGetCommentSuccess = (payload) => {
	return {
		type: CommentTypes.GET_COMMENT_BY_PRODUCT_SUCCESS,
		payload: payload,
	};
};

export const actSetIsLoading = () => {
	return {
		type: CommentTypes.SET_IS_LOADING,
	};
};
