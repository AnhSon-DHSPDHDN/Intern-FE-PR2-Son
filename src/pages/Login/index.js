import { Button, Form, Input, message } from 'antd';
import { Pages } from 'constants/pages';
import React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { actLogin } from 'redux/actions/authAction';
import './style.scss';

function Login() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { isLoading, notif, isLoggIn } = useSelector((state) => state.auth);

	const handleLogin = (value) => {
		dispatch(actLogin(value));
	};

	useEffect(() => {
		document.title = Pages.LOGIN;
	}, []);

	useEffect(() => {
		if (!isLoading && !isLoggIn && notif === 'loginFail') {
			message.info(t(notif));
		} else if (!isLoading && isLoggIn && notif === 'loginSucess') {
			message.info(t(notif));
		}
		// eslint-disable-next-line
	}, [isLoading]);

	if (isLoggIn) {
		return <Redirect to='/'></Redirect>;
	}

	return (
		<section id='login-page'>
			<Form
				id='form-login'
				labelCol={{ span: 24, offset: 0 }}
				className='login-form'
				onFinish={handleLogin}
			>
				<h1 className='title'>Login</h1>
				<Form.Item
					label='Username'
					name='username'
					rules={[
						{
							required: true,
							message: t('required.username'),
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Password'
					name='password'
					rules={[
						{
							required: true,
							message: t('required.password'),
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					wrapperCol={{
						offset: 0,
						span: 0,
					}}
				>
					<Button type='primary' htmlType='submit'>
						{t('login')}
					</Button>
					<div>
						{t('or')} <Link to='/register'>{` ${t('registerNow')}!`}</Link>
					</div>
				</Form.Item>
			</Form>
		</section>
	);
}

export default Login;
