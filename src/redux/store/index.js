import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import appReducers from 'redux/reducers';
import rootSaga from 'redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

const store =
	process.env.NODE_ENV === 'production'
		? createStore(appReducers, middleware)
		: createStore(appReducers, composeWithDevTools(middleware));

export default store;

sagaMiddleware.run(rootSaga);
