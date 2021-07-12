import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Table } from 'antd';
import { deleteProductById } from 'apis/productsApi';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
	actFiltersProduct,
	actGetProductsPage,
} from 'redux/actions/productAction';
import ModalCRUD from './ModalCRUD';

import './style.scss';

export default function AdminProducts() {
	const { productInPage } = useSelector((state) => state.productReducer);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const typingTimeoutRef = useRef(null);
	const modalRef = useRef(null);
	const [modeModal, setModeModal] = useState(null);

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
			title: t('priceOld'),
			width: 100,
			dataIndex: 'priceOld',
			key: 'priceOld',
			render: (text) => <div>$ {text}</div>,
		},
		{
			title: t('priceNew'),
			width: 100,
			dataIndex: 'priceNew',
			key: 'priceNew',
			render: (text) => <div>$ {text}</div>,
		},
		{
			title: t('rating'),
			width: 100,
			dataIndex: 'rating',
			key: 'rating',
		},
		{
			title: 'Brand',
			width: 100,
			dataIndex: 'brand',
			key: 'brand',
		},
		{
			title: 'Category',
			width: 100,
			dataIndex: 'category',
			key: 'category',
		},
		{
			title: t('tags'),
			width: 100,
			dataIndex: 'tags',
			key: 'tags',
			render: (record) => record.join(', '),
		},
		{
			title: t('action'),
			width: 100,
			key: 'total',
			render: (record) => (
				<>
					<Popconfirm
						title={t('areYouSure')}
						okText={t('yes')}
						cancelText={t('cancel')}
						onConfirm={() => handleDeleteProduct(record)}
					>
						<DeleteOutlined className='btn-delete' />
					</Popconfirm>
					<EditOutlined
						className='btn-edit ml-6'
						onClick={() => handleOpenEdit(record)}
					/>
				</>
			),
			fixed: 'right',
		},
	];

	const fetchAllProduct = () => {
		dispatch(actGetProductsPage());
	};

	const handleOpenEdit = (product) => {
		setModeModal('EDIT');
		modalRef.current?.handleOpenModal(product);
	};

	const handleDeleteProduct = async (product) => {
		await deleteProductById(product.id);
		message.success('Delete user success');
		fetchAllProduct();
	};

	const handleOpenAdd = () => {
		setModeModal('ADD');
		modalRef.current?.handleOpenModal();
	};

	const handleSearch = (e) => {
		const { value } = e.target;

		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}

		typingTimeoutRef.current = setTimeout(() => {
			dispatch(actFiltersProduct({ q: value }));
		}, 500);
	};

	useEffect(() => {
		fetchAllProduct();
		// eslint-disable-next-line
	}, []);

	return (
		<div id='admin'>
			<div className='filter filter-admin'>
				<input
					id='input-search'
					placeholder='Search...'
					type='text'
					onChange={handleSearch}
				/>
				<Button type='primary' onClick={handleOpenAdd}>
					<PlusOutlined />
				</Button>
			</div>
			<div className='table-admin table-product mt-2'>
				<Table
					columns={columns}
					dataSource={productInPage}
					rowKey='id'
					scroll={{ x: 500, y: 300 }}
				/>
			</div>
			<ModalCRUD ref={modalRef} mode={modeModal} reload={fetchAllProduct} />
		</div>
	);
}
