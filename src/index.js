import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n';
import store from 'redux/store';
import { Provider } from 'react-redux';

import App from './App';
import './styles/global.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<Provider store={store}>
		<I18nextProvider i18n={i18n}>
			<App />
		</I18nextProvider>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
