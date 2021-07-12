import {
	Button,
	Col,
	Form,
	Input,
	message,
	Popconfirm,
	Row,
	Spin,
	Table,
} from 'antd';
import React, { useEffect, useState } from 'react';

import './style.scss';
import NonAvatar from 'assets/imgs/non-avatar.jpg';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'antd/lib/modal/Modal';
import { actUpdateUser } from 'redux/actions/userAction';
import { actGetOrderUser } from 'redux/actions/orderAction';
import useCustomeHistory from 'hooks/useCustomHistory';
import { DeleteOutlined } from '@ant-design/icons';
import { actAddToCartSuccess } from 'redux/actions/cartAction';
import { actRemoveWishlistSuccess } from 'redux/actions/wishlistAction';

function ProfilePage() {
	const { t } = useTranslation();
	const { profile, isLoggIn } = useSelector((state) => state.auth);
	const isLoadingUser = useSelector((state) => state.user.isLoading);
	const status = useSelector((state) => state.user.status);
	const listOrder = useSelector((state) => state.orderReducer.orders);
	const listWishlist = useSelector((state) => state.wistlistReducer.wishlist);
	const [visibleModal, setVisibleModal] = useState(false);
	const [form] = Form.useForm();
	const profileNoPass = { ...profile };
	const dispatch = useDispatch();
	const history = useCustomeHistory();
	delete profileNoPass.password;

	const columnsWish = [
		{
			title: t('productName'),
			width: 100,
			dataIndex: 'imageMain',
			key: 'imageMain',
			fixed: 'left',
			render: (text) => (
				<img className='img-product' src={text} alt={text}></img>
			),
		},
		{
			title: t('name'),
			width: 200,
			dataIndex: 'name',
			key: 'name',
			fixed: 'left',
		},
		{
			title: t('price'),
			width: 100,
			dataIndex: 'priceNew',
			key: 'priceNew',
			render: (text) => <div>$ {text}</div>,
		},
		{
			title: t('buy'),
			width: 200,
			key: 'total',
			render: (record) => (
				<button
					className='btn-add add-cart'
					onClick={() => {
						handleAddToCart(record);
					}}
				>
					{t('addToCart')}
				</button>
			),
		},
		{
			title: t('action'),
			width: 100,
			key: 'total',
			render: (record) => (
				<Popconfirm
					title={t('areYouSure')}
					okText={t('yes')}
					cancelText={t('cancel')}
					onConfirm={() => handleDeleteWishlist(record)}
				>
					<DeleteOutlined className='btn-delete' />
				</Popconfirm>
			),
		},
	];

	const columnsOrder = [
		{
			title: 'ID',
			width: 50,
			dataIndex: 'id',
			key: 'id',
			fixed: 'left',
		},
		{
			title: t('name'),
			width: 100,
			dataIndex: 'fullName',
			key: 'fullName',
			fixed: 'left',
		},
		{
			title: t('address'),
			width: 150,
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: t('createAt'),
			width: 170,
			dataIndex: 'createAt',
			key: 'createAt',
			render: (text) => <span>{Date(text)}</span>,
		},
		{
			title: t('total'),
			width: 100,
			dataIndex: 'totalMonney',
			key: 'totalMonney',
			render: (text) => <span>$ {text}</span>,
		},
	];

	const handleUpdateInfo = (values) => {
		const payload = {
			...values,
			mail: values.email,
			email: values.username,
		};
		dispatch(actUpdateUser({ id: profile.id, payload: payload }));
	};

	const handleAddToCart = (product) => {
		dispatch(actAddToCartSuccess(product));
		message.success(t('addToCartSuccess'));
	};

	const handleDeleteWishlist = (record) => {
		dispatch(actRemoveWishlistSuccess({ id: record.id }));
	};

	useEffect(() => {
		form.setFieldsValue(profileNoPass);
		dispatch(actGetOrderUser(profile.id));
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (!isLoadingUser && status) {
			message.info(t(status));
			setVisibleModal(false);
		}
		// eslint-disable-next-line
	}, [isLoadingUser]);

	useEffect(() => {
		if (!isLoggIn) {
			history.push('/login');
		}
	}, [isLoggIn, history]);

	return (
		<section id='profile-page'>
			<div className='container my-8'>
				<Row gutter={[48, 16]}>
					<Col span={6}>
						<div className='avatar__container'>
							<img
								className='avatar'
								src={profile.avatar || NonAvatar}
								alt='avatar'
							/>
						</div>
					</Col>
					<Col span={18} className='user__container'>
						<div className='info-user'>
							<h1 className='text-center'>{t('infoMe')}</h1>
							<div className='info-order'>
								<div>
									<strong>{t('name')}: </strong>
									{profile.fullName}
								</div>
								<div>
									<strong>{t('phoneNumber')}: </strong>
									{profile.phone}
								</div>
								<div>
									<strong>Email: </strong>
									{profile.email}
								</div>
								<div>
									<strong>{t('address')}: </strong>
									{profile.address}
								</div>
							</div>
							<Button
								type='primary'
								className='mt-4'
								onClick={() => setVisibleModal(true)}
							>
								{t('updateInfo')}
							</Button>
						</div>
					</Col>
				</Row>
				<Row gutter={[48, 16]} className='my-8'>
					<Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
						<div className='my-order'>
							<h1>{t('order')}</h1>
							<Table
								columns={columnsOrder}
								dataSource={listOrder}
								rowKey='id'
								scroll={{ x: 500, y: 300 }}
							/>
						</div>
					</Col>
					<Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
						<div className='my-wishlist'>
							<h1>{t('header.wishList')}</h1>
							<Table
								columns={columnsWish}
								dataSource={listWishlist}
								rowKey='id'
								scroll={{ x: 500, y: 300 }}
							/>
						</div>
					</Col>
				</Row>
			</div>
			<Modal
				title={t('infoMe')}
				centered
				visible={visibleModal}
				width={500}
				onCancel={() => setVisibleModal(false)}
				onOk={() => form.submit()}
				forceRender
			>
				<Spin spinning={isLoadingUser} size='large' tip={t('loading')}>
					<Form
						form={form}
						id='form-checkout'
						labelCol={{ span: 8, offset: 0 }}
						onFinish={handleUpdateInfo}
					>
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
								{
									min: 6,
									message: 'Password to short',
								},
							]}
						>
							<Input.Password />
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
							name='phone'
							label={t('phoneNumber')}
							rules={[
								{
									required: true,
									message: t('required.phoneNumber'),
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name='email'
							label='E-mail'
							rules={[
								{
									required: true,
									message: t('required.email'),
								},
								{
									type: 'email',
									message: t('validate.email'),
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item name='avatar' label={t('avatar')}>
							<Input />
						</Form.Item>
					</Form>
				</Spin>
			</Modal>
		</section>
	);
}

export default ProfilePage;
