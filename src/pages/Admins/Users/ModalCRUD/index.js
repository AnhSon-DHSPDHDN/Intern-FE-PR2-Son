import { Form, Input, message, Modal, Radio, Spin } from 'antd';
import { createUser, updateUser } from 'apis/usersApi';
import React, {
	forwardRef,
	useImperativeHandle,
	useState,
	useRef,
} from 'react';
import { useTranslation } from 'react-i18next';

const ModalCRUD = forwardRef(({ reload, mode }, modalRef) => {
	const [visible, setVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const idUserRef = useRef(null);

	useImperativeHandle(modalRef, () => ({
		handleOpenModal,
	}));

	const handleOpenModal = (user) => {
		if (user) {
			idUserRef.current = user.id;
			const cloneUser = { ...user };
			delete cloneUser.password;
			cloneUser.username = cloneUser.email.split('@')[0];
			form.setFieldsValue(cloneUser);
		}
		setVisible(true);
	};

	const hanldeCloseModal = () => {
		form.resetFields();
		setVisible(false);
	};

	const onAddUser = async (user) => {
		try {
			setIsLoading(true);
			const res = await createUser(user);
			if (res.status === 201) {
				message.success('Create user success!');
			} else throw new Error();
		} catch (error) {
			message.warn('Create User fail');
		} finally {
			reload();
			form.resetFields();
			setIsLoading(false);
			setVisible(false);
		}
	};

	const onEditUser = async (user) => {
		try {
			setIsLoading(true);
			const res = await updateUser(idUserRef.current, user);
			if (res.status === 200) {
				message.success('Edit user success!');
			} else throw new Error();
		} catch (error) {
			message.warn('Edit User fail');
		} finally {
			reload();
			form.resetFields();
			setIsLoading(false);
			setVisible(false);
		}
	};

	const handleSubmitForm = (values) => {
		const payload = {
			...values,
			mail: values.email,
			email: values.username,
		};
		if (mode === 'ADD') {
			onAddUser(payload);
		} else if (mode === 'EDIT') {
			onEditUser(payload);
		}
		// dispatch(actUpdateUser({ id: profile.id, payload: payload }));
	};

	return (
		<Modal
			title={mode}
			centered
			visible={visible}
			width={500}
			onCancel={hanldeCloseModal}
			onOk={() => form.submit()}
			forceRender
		>
			<Spin spinning={isLoading} size='large' tip='Loading...'>
				<Form
					form={form}
					id='form-checkout'
					labelCol={{ span: 8, offset: 0 }}
					onFinish={handleSubmitForm}
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

					<Form.Item
						name='isAdmin'
						label='Role'
						rules={[
							{
								required: true,
								message: 'Role is required',
							},
						]}
					>
						<Radio.Group>
							<Radio value={true}>Admin</Radio>
							<Radio value={false}>User</Radio>
						</Radio.Group>
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	);
});

export default ModalCRUD;
