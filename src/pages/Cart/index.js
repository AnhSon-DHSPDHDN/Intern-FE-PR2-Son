import { DeleteOutlined } from '@ant-design/icons';
import {
	Button,
	Col,
	Divider,
	Form,
	Input,
	InputNumber,
	message,
	Popconfirm,
	Radio,
	Row,
	Spin,
	Table,
} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import useCustomeHistory from 'hooks/useCustomHistory';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
	actChangeCartSuccess,
	actRemoveToCartSuccess,
} from 'redux/actions/cartAction';
import { actCreateOrder } from 'redux/actions/orderAction';

import './style.scss';

function CartPage() {
	const { t } = useTranslation();
	const { cart } = useSelector((state) => state.cartReducer);
	const { isLoggIn, profile } = useSelector((state) => state.auth);
	const { isLoading, order, notification } = useSelector(
		(state) => state.orderReducer
	);
	const [visibleModal, setVisibleModal] = useState(false);
	const [visibleOrder, setVisibleOrder] = useState(false);
	const history = useCustomeHistory();
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [paymentMethod, setPaymentMethod] = useState(1);
	const totalMonney = cart.reduce((total, product) => {
		total += product.priceNew * product.quantity;
		return total;
	}, 0);
	const columns = [
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
			title: t('quantity'),
			width: 100,
			dataIndex: 'quantity',
			key: 'quantity',
			render: (text, record) => (
				<InputNumber
					defaultValue={text}
					max={10}
					min={1}
					onChange={(value) => handleChangeInput(value, record)}
					parser={(value) => (value ? value : 1)}
				></InputNumber>
			),
		},
		{
			title: t('total'),
			width: 100,
			key: 'total',
			render: (record) => (
				<div className='total-column'>
					$ {Math.round(record?.quantity * record?.priceNew)}
				</div>
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
					onConfirm={() => handleDeleteCart(record)}
				>
					<DeleteOutlined className='btn-delete' />
				</Popconfirm>
			),
		},
	];

	const handleDeleteCart = (record) => {
		dispatch(actRemoveToCartSuccess({ id: record.id }));
	};

	const handleChangeInput = (value, record) => {
		dispatch(actChangeCartSuccess({ id: record.id, quantity: value }));
	};

	const handleChangePayment = (e) => {
		setPaymentMethod(e.target.value);
	};

	const handleGoShopping = () => {
		history.push('/products');
	};

	const handleCheckout = () => {
		if (!isLoggIn) {
			return message.warning(t('needLogin'));
		}
		setVisibleModal(true);
	};

	const handleCompleteCheckout = () => {
		setVisibleOrder(false);
		setVisibleModal(false);
	};

	const onCheckout = (value) => {
		const infoShip = { ...value };
		delete infoShip.bankNumber;
		delete infoShip.secretCard;
		const order = {
			createAt: new Date().getTime(),
			idUser: profile.id,
			cart: [...cart],
			totalMonney: totalMonney,
			paymentMethod: paymentMethod === 1 ? 'online' : 'cash',
			...infoShip,
		};
		dispatch(actCreateOrder(order));
	};

	useEffect(() => {
		form.setFieldsValue(profile);
		// eslint-disable-next-line
	}, [profile]);

	useEffect(() => {
		if (!isLoading && notification) {
			message.info(t(notification));
			setVisibleOrder(true);
		}
		// eslint-disable-next-line
	}, [isLoading]);

	return (
		<section id='cart-page'>
			<div className='container my-8'>
				<Row gutter={[16, 16]}>
					<Col
						xs={{ span: 24 }}
						sm={{ span: 24 }}
						lg={{ span: 18 }}
						className='cart-list'
					>
						<Table
							columns={columns}
							dataSource={cart}
							rowKey='id'
							scroll={{ x: 500, y: 300 }}
						/>
					</Col>
					<Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 6 }}>
						<div className='cart-total'>
							<h3>{t('cartToTal')}</h3>
							<hr></hr>
							<div className='cart-subtotal mt-6'>
								<div className='fw-6'>{t('subtotal')}:</div>
								<div className='fw-6'>${Math.round(totalMonney)}</div>
							</div>
							<Divider />
							<h3>{t('payment')}:</h3>
							<Radio.Group
								name='radiogroup'
								defaultValue={1}
								onChange={handleChangePayment}
							>
								<Radio value={1}>{t('online')}</Radio>
								<Radio value={2}>{t('direct')}</Radio>
							</Radio.Group>
							{!!cart.length && (
								<button
									className='btn-checkout btn-cart mt-2'
									onClick={handleCheckout}
								>
									{t('checkout')}
								</button>
							)}
							<button
								className='btn-back btn-cart mt-2'
								onClick={handleGoShopping}
							>
								{t('continueBuy')}
							</button>
						</div>
					</Col>
				</Row>

				<Modal
					title={t('checkout')}
					centered
					visible={visibleModal}
					width={900}
					onCancel={() => setVisibleModal(false)}
					onOk={() => form.submit()}
					forceRender
				>
					<Spin spinning={isLoading} size='large' tip={t('loading')}>
						<Form
							form={form}
							id='form-checkout'
							labelCol={{ span: 8, offset: 0 }}
							onFinish={onCheckout}
						>
							<Row gutter={[16, 16]}>
								<Col span={12}>
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
								</Col>
								{paymentMethod === 1 && (
									<Col span={12}>
										<Form.Item
											name='bankNumber'
											label={t('bankNumber')}
											rules={[
												{
													required: true,
													message: t('required.bankNumber'),
												},
											]}
										>
											<Input />
										</Form.Item>

										<Form.Item
											name='secretCard'
											label={t('secretCard')}
											rules={[
												{
													required: true,
													message: t('required.secretCard'),
												},
											]}
										>
											<Input />
										</Form.Item>
										<p className='ml-8'>{t('noteBankCard')}</p>
									</Col>
								)}
							</Row>
						</Form>
					</Spin>
				</Modal>
				<Modal
					id='modal-order'
					title={t('order')}
					centered
					visible={visibleOrder}
					width={500}
					forceRender
					onOk={handleCompleteCheckout}
					onCancel={handleCompleteCheckout}
					footer={[
						<Button
							key='submit'
							type='primary'
							onClick={handleCompleteCheckout}
						>
							Ok
						</Button>,
					]}
				>
					<div className='info-order'>
						<div>
							<strong>{t('name')}: </strong>
							{order.fullName}
						</div>
						<div>
							<strong>{t('phoneNumber')}: </strong>
							{order.phone}
						</div>
						<div>
							<strong>Email: </strong>
							{order.email}
						</div>
						<div>
							<strong>{t('address')}: </strong>
							{order.address}
						</div>
						<div>
							<strong>{t('payment')}: </strong>
							{order.paymentMethod}
						</div>
						<div>
							<strong>{t('total')}: </strong>
							{order.totalMonney} $
						</div>
					</div>
				</Modal>
			</div>
		</section>
	);
}

export default CartPage;
