import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Table } from 'antd';
import React, { useRef, useState } from 'react';
import ModalCRUD from './ModalCRUD';
import '../Products/style.scss';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { deleteUser, getAllUser } from 'apis/usersApi';
import { useSelector } from 'react-redux';

export default function AdminUsers() {
	const modalRef = useRef(null);
	const [modeModal, setModeModal] = useState(null);
	const { t } = useTranslation();
	const [dataUsers, setDataUsers] = useState([]);
	const typingTimeoutRef = useRef(null);
	const isComponentMouted = useRef(null);
	const { profile } = useSelector((state) => state.auth);

	const columns = [
		{
			title: 'Id',
			width: 100,
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Username',
			width: 100,
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Role',
			width: 100,
			dataIndex: 'isAdmin',
			key: 'isAdmin',
			render: (text) => (text ? 'Admin' : 'User'),
		},
		{
			title: 'Name',
			width: 100,
			dataIndex: 'fullName',
			key: 'fullName',
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
						onConfirm={() => handleDeleteUser(record)}
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

	const handleSearch = (e) => {
		const { value } = e.target;

		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}

		typingTimeoutRef.current = setTimeout(() => {
			if (value) {
				fetchApiUser({ email: value });
			} else {
				fetchApiUser();
			}
		}, 500);
	};

	const handleOpenAdd = () => {
		setModeModal('ADD');
		modalRef.current?.handleOpenModal();
	};

	const fetchApiUser = async (payload) => {
		const data = await getAllUser(payload);
		isComponentMouted.current && setDataUsers(data);
	};

	const handleOpenEdit = (record) => {
		if (record.id === 1) {
			return message.warning('Can not edit App Admin!');
		}
		if (record.id === profile.id) {
			return message.error('Can not Edit User');
		}
		setModeModal('EDIT');
		modalRef.current?.handleOpenModal(record);
	};

	const handleDeleteUser = async (user) => {
		const { id } = user;
		if (id === 1) {
			return message.warning('Can not remove App Admin!');
		}
		if (id === profile.id) {
			return message.error('Can not delete User');
		}
		await deleteUser(user.id);
		message.success('Delete User success!');
		fetchApiUser();
	};

	useEffect(() => {
		isComponentMouted.current = true;
		fetchApiUser();
		return () => {
			isComponentMouted.current = false;
		};
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
					dataSource={dataUsers}
					rowKey='id'
					scroll={{ x: 500, y: 300 }}
				/>
			</div>
			<ModalCRUD ref={modalRef} mode={modeModal} reload={fetchApiUser} />
		</div>
	);
}
