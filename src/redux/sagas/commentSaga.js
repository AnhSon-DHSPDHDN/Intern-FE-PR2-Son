import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { createCommentApi, getCommentByProduct } from 'apis/commentApi';
import { CommentTypes } from 'constants/types';
import {
	actGetCommentSuccess,
	actSetIsLoading,
} from 'redux/actions/commentAction';

function* createComment({ payload }) {
	yield put(actSetIsLoading());
	const { idProduct } = payload;
	yield call(createCommentApi, payload);
	const comments = yield call(getCommentByProduct, idProduct);
	yield put(actGetCommentSuccess(comments));
}

function* getCommentProduct({ payload }) {
	yield put(actSetIsLoading());
	const comments = yield call(getCommentByProduct, payload);
	yield put(actGetCommentSuccess(comments));
}

function* watchGetCommentProduct() {
	yield takeEvery(CommentTypes.GET_COMMENT_BY_PRODUCT, getCommentProduct);
}

function* watchCreateComment() {
	yield takeLatest(CommentTypes.CREATE_COMMENT, createComment);
}

// eslint-disable-next-line
export default [watchCreateComment(), watchGetCommentProduct()];
