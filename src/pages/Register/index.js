import { Button, Form, Input, message, Select } from 'antd';
import useCustomeHistory from 'hooks/useCustomHistory';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actCreateUser } from 'redux/actions/userAction';

import './style.scss';

const valid = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3}$/im;

function Register() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { isLoading, status } = useSelector((state) => state.user);
	const history = useCustomeHistory();

	const prefixSelector = (
		<Form.Item name='prefix' noStyle>
			<Select style={{ width: 70 }}>
				<Select.Option value='84'>+84</Select.Option>
				<Select.Option value='85'>+85</Select.Option>
			</Select>
		</Form.Item>
	);

	const handleRegister = (value) => {
		const user = {
			email: value.username,
			password: value.password,
			phone: `${value.prefix}${value.phone}`,
			mail: value.email,
			address: value.address,
			fullName: value.fullName,
		};
		dispatch(actCreateUser(user));
	};

	useEffect(() => {
		if (!isLoading && status) {
			message.info(t(status));
			if (status === 'registerSucess') {
				history.push('/login');
			}
		}
		// eslint-disable-next-line
	}, [isLoading]);

	return (
		<section id='register-page'>
			<Form
				id='form-register'
				labelCol={{ span: 8, offset: 0 }}
				onFinish={handleRegister}
			>
				<h1 className='title text-center'>Register</h1>
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
					label={t('password')}
					name='password'
					rules={[
						{
							required: true,
							message: t('required.password'),
						},
						{
							min: 6,
							message: t('validate.password.length'),
						},
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name='confirm'
					label={t('confirmPass')}
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: t('validate.password.repass'),
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(t('validate.password.passNotMatch'));
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name='phone'
					label={t('phoneNumber')}
					rules={[
						{ required: true, message: t('required.phoneNumber') },
						() => ({
							validator(_, value) {
								if (!value || value.match(valid)) {
									return Promise.resolve();
								}
								return Promise.reject(t('validate.phone'));
							},
						}),
					]}
				>
					<Input addonBefore={prefixSelector} style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item
					name='email'
					label='E-mail'
					rules={[
						{
							type: 'email',
							message: t('validate.email'),
						},
						{
							required: true,
							message: t('required.email'),
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name='address'
					label={t('address')}
					rules={[
						{
							required: true,
							message: t('required.address'),
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name='fullName'
					label={t('fullName')}
					rules={[
						{
							required: true,
							message: t('required.fullName'),
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 0,
					}}
				>
					<Button type='primary' htmlType='submit'>
						{t('register')}
					</Button>
					<div>
						{t('or')} <Link to='/login'>{` ${t('loginNow')}!`}</Link>
					</div>
				</Form.Item>
			</Form>
		</section>
	);
}

export default Register;
