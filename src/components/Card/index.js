import { Card, message } from 'antd';
import React from 'react';

import './style.scss';
import {
	HeartOutlined,
	ShoppingCartOutlined,
	StarFilled,
	StarOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actAddToCartSuccess } from 'redux/actions/cartAction';

export const showRating = (rating) => {
	const template = [];
	let i = 1;
	while (i <= 5) {
		if (i <= rating) {
			template.push(<StarFilled className='is-rating' key={i} />);
		} else template.push(<StarOutlined className='is-rating' key={i} />);
		i++;
	}
	return template;
};

function ProductCard(props) {
	const { t } = useTranslation();
	const { loading, product } = props;
	const dispatch = useDispatch();

	const mapListTags = (tags) => {
		return tags.map((tag, index) => {
			switch (tag) {
				case 'sale': {
					return (
						<div className='tag-item bg-red' key={index}>
							{t('product.sale')}
						</div>
					);
				}
				case 'hot': {
					return (
						<div className='tag-item bg-yellow' key={index}>
							{t('product.hot')}
						</div>
					);
				}
				case 'new': {
					return (
						<div className='tag-item bg-green' key={index}>
							{t('product.new')}
						</div>
					);
				}
				default:
					return null;
			}
		});
	};

	const handleAddToCart = (product) => {
		dispatch(actAddToCartSuccess(product));
		message.success(t('addToCartSuccess'));
	};

	return (
		<Card
			id='card-product'
			className='card-product ml-2 mr-2 mt-2 mb-2'
			hoverable
			loading={loading}
		>
			<div className='product-tags'>{product && mapListTags(product.tags)}</div>
			<div className='card-actions'>
				<button
					className='btn-add add-cart btn-action'
					onClick={() => {
						handleAddToCart(product);
					}}
				>
					<ShoppingCartOutlined />
				</button>
				<button className='btn-wish add-wish btn-action'>
					<HeartOutlined />
				</button>
			</div>
			<img
				className='card-img'
				alt='products'
				src={product?.imageMain}
				onMouseMove={(e) => (e.target.src = product?.images[1])}
				onMouseOut={(e) => (e.target.src = product?.imageMain)}
			/>
			<div className='card-info'>
				<h3 className='product-name'>{product?.name}</h3>
				<div className='product-price'>
					<span className='old-price price mr-6'>$ {product?.priceOld}</span>
					<span className='new-price price'>$ {product?.priceNew}</span>
				</div>
				{showRating(product?.rating)}
				<span className='product-review ml-2'>{`( ${product?.rating} ${t(
					'homePage.review'
				)} )`}</span>
			</div>
		</Card>
	);
}

export default ProductCard;
