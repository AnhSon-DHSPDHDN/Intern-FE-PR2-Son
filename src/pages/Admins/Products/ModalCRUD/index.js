import {
	Checkbox,
	Col,
	Form,
	Input,
	InputNumber,
	message,
	Radio,
	Row,
	Spin,
} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { createProduct, updateProduct } from 'apis/productsApi';
import React, {
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';

const plainOptions = ['New', 'Sale', 'Hot'];

const ModalCRUD = forwardRef(({ reload, mode }, modalRef) => {
	const [visible, setVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [checkedListTags, setCheckedListTags] = useState([]);
	const [form] = Form.useForm();
	const idProductRef = useRef(null);

	useImperativeHandle(modalRef, () => {
		return {
			handleOpenModal,
		};
	});

	const handleOpenModal = (product) => {
		if (product) {
			idProductRef.current = product.id;
			const value = {
				...product,
				image1: product.images[1],
				image2: product.images[2] || '',
				tags: product.tags?.map(
					(tag) => tag.charAt(0).toUpperCase() + tag.slice(1)
				),
			};
			form.setFieldsValue(value);
		}
		setVisible(true);
	};

	const onChangeTags = (list) => {
		setCheckedListTags(list);
	};

	const handleCloseModal = () => {
		setVisible(false);
		form.resetFields();
	};

	const onEditProduct = async (id, product) => {
		setIsLoading(true);
		const res = await updateProduct(id, product);
		if (res.status === 200) {
			message.success('Edit product Success');
		} else {
			message.warning('Edit product fail');
		}
		reload();
		form.resetFields();
		setIsLoading(false);
		setVisible(false);
	};

	const onAddProduct = async (product) => {
		setIsLoading(true);
		const res = await createProduct(product);
		if (res.status === 201) {
			message.success('Add product Success');
		} else {
			message.warning('Add product fail');
		}
		reload();
		form.resetFields();
		setIsLoading(false);
		setVisible(false);
	};

	const handleSubmit = (value) => {
		const valueClone = { ...value };
		delete valueClone.image1;
		delete valueClone.image2;
		const product = {
			...valueClone,
			images: [value.imageMain, value.image1, value.image2],
			tags: value.tags?.map((tag) => tag.toLowerCase()),
		};
		if (mode === 'ADD') {
			onAddProduct(product);
		} else if (mode === 'EDIT') {
			onEditProduct(idProductRef.current, product);
		}
	};

	return (
		<Modal
			visible={visible}
			width='1000px'
			title={mode}
			onCancel={handleCloseModal}
			onOk={() => form.submit()}
			forceRender
		>
			<Spin spinning={isLoading} size='large' tip='Loading...'>
				<Form
					form={form}
					id='form-modal'
					labelCol={{ span: 8, offset: 0 }}
					onFinish={handleSubmit}
				>
					<Row gutter={[16, 32]}>
						<Col span={12}>
							<Form.Item
								name='name'
								label='Name'
								rules={[
									{
										required: true,
										message: 'Name is required',
									},
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								name='description'
								label='Description'
								rules={[
									{
										required: true,
										message: 'Description is required',
									},
								]}
							>
								<Input.TextArea />
							</Form.Item>

							<Form.Item
								name='rating'
								label='Rating'
								rules={[
									{
										required: true,
										message: 'Rating is required',
									},
								]}
							>
								<InputNumber min={1} max={5} />
							</Form.Item>

							<Form.Item name='priceOld' label='Old Price'>
								<InputNumber />
							</Form.Item>
							<Form.Item
								name='priceNew'
								label='New Price'
								rules={[
									{
										required: true,
										message: 'New Price is required',
									},
								]}
							>
								<InputNumber />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name='imageMain'
								label='Main Image'
								rules={[
									{
										required: true,
										message: 'Main Image is required',
									},
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								name='image1'
								label='Detail Image'
								rules={[
									{
										required: true,
										message: 'Detail Image is required',
									},
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item name='image2' label='Detail Image'>
								<Input />
							</Form.Item>

							<Form.Item name='tags' label='Tags'>
								<Checkbox.Group
									options={plainOptions}
									value={checkedListTags}
									onChange={onChangeTags}
								></Checkbox.Group>
							</Form.Item>

							<Form.Item
								name='category'
								label='Category'
								rules={[
									{
										required: true,
										message: 'Category is required',
									},
								]}
							>
								<Radio.Group>
									<Radio value='furniture'>Furniture</Radio>
									<Radio value='coffee-tables'>Coffee-Tables</Radio>
									<Radio value='lighting'>Lighting</Radio>
									<Radio value='decoration'>Decoration</Radio>
									<Radio value='electronics'>Electronics</Radio>
									<Radio value='beds'>Beds</Radio>
									<Radio value='armchairs'>Armchairs</Radio>
									<Radio value='sofas'>Sofas</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item
								name='brand'
								label='Brand'
								rules={[
									{
										required: true,
										message: 'Brand is required',
									},
								]}
							>
								<Radio.Group>
									<Radio value='nike'>Nike</Radio>
									<Radio value='samsung'>Samsung</Radio>
									<Radio value='apple'>Apple</Radio>
									<Radio value='coolmate'>Coolmate</Radio>
								</Radio.Group>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Spin>
		</Modal>
	);
});

export default ModalCRUD;
