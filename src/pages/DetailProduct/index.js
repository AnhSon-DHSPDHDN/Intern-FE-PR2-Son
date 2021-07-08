import {
	Col,
	Divider,
	Form,
	Image,
	InputNumber,
	message,
	Rate,
	Row,
	Spin,
} from 'antd';
import React, { useState, useEffect } from 'react';

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
import { useDispatch } from 'react-redux';
import useCustomeHistory from 'hooks/useCustomHistory';
import { actGetProductById } from 'redux/actions/productAction';
import { useSelector } from 'react-redux';
import { actAddMoreToCartSuccess } from 'redux/actions/cartAction';
import { actAddWishlistSuccess } from 'redux/actions/wishlistAction';
import { actCreateComment, actGetComment } from 'redux/actions/commentAction';
import NonAvatar from 'assets/imgs/non-avatar.jpg';

function DetailProduct() {
	const { t } = useTranslation();
	const { product, isLoading } = useSelector((state) => state.productReducer);
	const comments = useSelector((state) => state.commentReducer.comments);
	const isLoadingCmt = useSelector((state) => state.commentReducer.isLoading);
	const { isLoggIn, profile } = useSelector((state) => state.auth);
	const [imgMain, setImgMain] = useState(null);
	const [chooseColor, setChooseColor] = useState(null);
	const [chooseQuantity, setChooseQuantity] = useState(null);
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const history = useCustomeHistory();

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
		dispatch(actAddMoreToCartSuccess({ product: product, chooseQuantity }));
		setChooseQuantity(null);
		setChooseColor(null);
		message.success(t('addToCartSuccess'));
	};

	const handleClickWishlist = () => {
		if (isLoggIn) {
			dispatch(actAddWishlistSuccess(product));
			message.success(t('addToWishListSuccess'));
		} else {
			message.warn(t('needLoginWishList'));
		}
	};

	const handleSubmitComment = (value) => {
		if (isLoggIn) {
			const comment = {
				idProduct: product.id,
				description: value.yourComment,
				rating: value.yourRating,
				createAt: new Date().getTime(),
				avatar: profile.avatar,
				nameCmt: profile.fullName,
			};
			dispatch(actCreateComment(comment));
		} else {
			message.warn(t('needLoginToComment'));
		}
		form.resetFields();
	};

	const mapListReview = (reviews) => {
		return reviews.map((review) => {
			return (
				<Row gutter={[16, 16]} key={review.id} className='my-4'>
					<Col span={3}>
						<div className='user-review ml-2'>
							<img src={review.avatar || NonAvatar} alt='avatar'></img>
							<div className='rating'>{showRating(review.rating)}</div>
						</div>
					</Col>
					<Col span={21}>
						<h4>{review.nameCmt}</h4>
						<p>{review.description}</p>
					</Col>
				</Row>
			);
		});
	};

	useEffect(() => {
		const { location } = history;
		const id = location.pathname.split('/')[2];
		dispatch(actGetProductById(id));
		// eslint-disable-next-line
	}, [dispatch, history.location.pathname]);

	useEffect(() => {
		if (product.imageMain) {
			setImgMain(product.imageMain);
		}
		// eslint-disable-next-line
	}, [isLoading]);

	useEffect(() => {
		dispatch(actGetComment(product.id));
	}, [dispatch, product.id]);

	const mapListImages = (imgs) => {
		return imgs.map((img, index) => {
			return (
				<Image
					src={img}
					className='list-imgs__item'
					preview={false}
					key={index}
					onClick={handleChangeImg}
				></Image>
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
									{product.images && mapListImages(product.images)}
								</div>
							</Col>
							<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }}>
								<Image className='image-main' src={imgMain} preview></Image>
							</Col>
						</Row>
					</Col>
					<Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
						<div className='main-info px-4'>
							<h1>{product?.name}</h1>
							<div className='info-reviews'>
								{showRating(product?.rating)}
								<span className='product-review ml-2'>{`( ${
									product?.rating
								} ${t('homePage.review')} )`}</span>
							</div>
							<p className='info-description my-2'>{product?.description}</p>
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
							<button
								className='btn-wish add-wish ml-4'
								onClick={handleClickWishlist}
							>
								<HeartOutlined className='mr-2' />
								{t('addToWishList')}
							</button>
							<Divider />
							<div className='product-quantity'>
								{t('productPage.category')}: {product?.category}
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
				<div className='list-review'>
					{mapListReview(comments)}
					{isLoadingCmt && <Spin className='spin__antd'></Spin>}
				</div>
				<h1 className='my-6'>{t('sendReview')}</h1>
				<div className='send-comment'>
					<p>{t('noteComment')}</p>
					<Form onFinish={handleSubmitComment} form={form}>
						<Form.Item
							rules={[{ required: true }]}
							label={t('yourRating')}
							name='yourRating'
						>
							<Rate></Rate>
						</Form.Item>
						<Form.Item
							rules={[{ required: true }]}
							label={t('comment')}
							name='yourComment'
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
