import { Col, Divider, Form, Image, InputNumber, Rate, Row } from 'antd';
import React, { useState } from 'react';

import imgMain2 from 'assets/products/pr1.jpg';
import img1 from 'assets/products/pr2.jpg';
import img2 from 'assets/products/pr3.jpg';
import './style.scss';
import { showRating } from 'components/Card';
import { useTranslation } from 'react-i18next';
import {
	FacebookOutlined,
	HeartOutlined,
	InstagramOutlined,
	ShoppingCartOutlined,
	SkypeOutlined,
	YoutubeOutlined,
} from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

const mockProduct = {
	name: 'Beige metal hoop tote bag',
	description:
		'Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus.',
	rating: 4,
	reviews: 2,
	price: 80,
	imgMain: imgMain2,
	images: [imgMain2, img1, img2],
	category: 'Sam sung',
};

const mockReview = [
	{
		id: 1,
		fullName: 'Trần Văn Anh Sơn',
		avatar:
			'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.6435-9/168400522_1617527291784240_3208502572735437647_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=VbUDWEdI2nIAX8xCU15&_nc_ht=scontent.fhan2-4.fna&oh=9516f76159f7452c2c7228aaaa953341&oe=60E5C190',
		comment: 'Hàng đẹp, mẫu mã đẹp, phù hợp với giá tiền. Sử dụng tốt',
		rating: 3,
	},
	{
		id: 2,
		fullName: 'Trần Văn Anh Sơn',
		avatar:
			'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.6435-9/168400522_1617527291784240_3208502572735437647_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=VbUDWEdI2nIAX8xCU15&_nc_ht=scontent.fhan2-4.fna&oh=9516f76159f7452c2c7228aaaa953341&oe=60E5C190',
		comment: 'Hàng đẹp, mẫu mã đẹp, phù hợp với giá tiền. Sử dụng tốt',
		rating: 4,
	},
];

function DetailProduct() {
	const { t } = useTranslation();
	const [imgMain, setImgMain] = useState(imgMain2);
	const [chooseColor, setChooseColor] = useState(null);
	const [chooseQuantity, setChooseQuantity] = useState(null);
	const [form] = Form.useForm();

	const handleChooseColor = (e) => {
		const color = e.target.getAttribute('name');
		setChooseColor(color);
	};

	const handleChangeImg = (e) => {
		const { src } = e.target;
		setImgMain(src);
	};

	const handleChangeQuantity = (value) => {
		setChooseQuantity(value);
	};

	const handleClickBuy = () => {
		setChooseQuantity(null);
		setChooseColor(null);
	};

	const handleSubmitComment = (value) => {
		form.resetFields();
	};

	const mapListReview = (reviews) => {
		return reviews.map((review) => {
			return (
				<Row gutter={[16, 16]} key={review.id} className='my-4'>
					<Col span={3}>
						<div className='user-review ml-2'>
							<img src={review.avatar} alt='avatar'></img>
							<div className='rating'>{showRating(review.rating)}</div>
						</div>
					</Col>
					<Col span={21}>
						<h4>{review.fullName}</h4>
						<p>{review.comment}</p>
					</Col>
				</Row>
			);
		});
	};

	return (
		<section id='product-detail-page'>
			<div className='container my-8'>
				<Row gutter={[16, 16]}>
					<Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
						<Row gutter={[16, 16]}>
							<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }}>
								<div className='list-imgs'>
									<Image
										src={img1}
										className='list-imgs__item'
										preview={false}
										onClick={handleChangeImg}
									></Image>
									<Image
										src={img2}
										className='list-imgs__item'
										preview={false}
										onClick={handleChangeImg}
									></Image>
									<Image
										src={img2}
										className='list-imgs__item'
										preview={false}
										onClick={handleChangeImg}
									></Image>
								</div>
							</Col>
							<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }}>
								<Image className='image-main' src={imgMain} preview></Image>
							</Col>
						</Row>
					</Col>
					<Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
						<div className='main-info px-4'>
							<h1>{mockProduct.name}</h1>
							<div className='info-reviews'>
								{showRating(mockProduct.rating)}
								<span className='product-review ml-2'>{`( ${
									mockProduct.reviews
								} ${t('homePage.review')} )`}</span>
							</div>
							<p className='info-description my-2'>{mockProduct.description}</p>
							<div className='option-color my-4'>
								<span className='label-color option-label'>{t('color')}</span>
								<div className='list-color ml-6'>
									<div
										className={`color-black ${
											chooseColor === 'black' ? 'active' : null
										}`}
										name='black'
										onClick={handleChooseColor}
									></div>
									<div
										className={`color-green ml-3 ${
											chooseColor === 'green' ? 'active' : null
										}`}
										name='green'
										onClick={handleChooseColor}
									></div>
									<div
										className={`color-yellow ml-3 ${
											chooseColor === 'yellow' ? 'active' : null
										}`}
										name='yellow'
										onClick={handleChooseColor}
									></div>
									<div
										className={`color-red ml-3 ${
											chooseColor === 'red' ? 'active' : null
										}`}
										name='red'
										onClick={handleChooseColor}
									></div>
								</div>
							</div>
							<div className='option-size my-4'>
								<span className='label-size option-label'>{t('quantity')}</span>
								<InputNumber
									className='ml-8'
									min={0}
									max={10}
									onChange={handleChangeQuantity}
									value={chooseQuantity}
								/>
							</div>
							<button
								className='btn-add add-cart'
								disabled={!(!!chooseColor && !!chooseQuantity)}
								onClick={handleClickBuy}
							>
								<ShoppingCartOutlined className='mr-2' />
								{t('addToCart')}
							</button>
							<button className='btn-wish add-wish ml-4'>
								<HeartOutlined className='mr-2' />
								{t('addToWishList')}
							</button>
							<Divider />
							<div className='product-quantity'>
								{t('productPage.category')}: {mockProduct.category}
							</div>
							<div className='share'>
								<span>{t('share')}</span>
								<div className='content__social'>
									<div className='social-item fb'>
										<FacebookOutlined />
									</div>
									<div className='social-item skype'>
										<SkypeOutlined />
									</div>
									<div className='social-item inta'>
										<InstagramOutlined />
									</div>
									<div className='social-item youtube'>
										<YoutubeOutlined />
									</div>
								</div>
							</div>
						</div>
					</Col>
				</Row>
				<h1 className='my-6'>{t('homePage.review')}</h1>
				<div className='list-review'>{mapListReview(mockReview)}</div>
				<h1 className='my-6'>{t('sendReview')}</h1>
				<div className='send-comment'>
					<p>{t('noteComment')}</p>
					<Form onFinish={handleSubmitComment} form={form}>
						<Form.Item
							rules={[{ required: true }]}
							label={t('yourRating')}
							name='your-rating'
						>
							<Rate></Rate>
						</Form.Item>
						<Form.Item
							rules={[{ required: true }]}
							label={t('comment')}
							name='your-comment'
						>
							<TextArea></TextArea>
						</Form.Item>
						<Form.Item wrapperCol={{ offset: 2 }}>
							<button type='submit' className='btn-submit'>
								{t('comment')}
							</button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</section>
	);
}

export default DetailProduct;
