import { Card } from 'antd';
import React from 'react';

import './style.scss';
import img1 from 'assets/products/pr1.jpg';
import img2 from 'assets/products/pr2.jpg';
import {
	HeartOutlined,
	ShoppingCartOutlined,
	StarFilled,
	StarOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const mockTagsProducts = ['sale', 'hot', 'new'];
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

function ProductCard() {
	const { t } = useTranslation();

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

	return (
		<Card
			id='card-product'
			className='card-product ml-2 mr-2 mt-2 mb-2'
			hoverable
			loading={false}
		>
			<div className='product-tags'>{mapListTags(mockTagsProducts)}</div>
			<div className='card-actions'>
				<button className='btn-add add-cart btn-action'>
					<ShoppingCartOutlined />
				</button>
				<button className='btn-wish add-wish btn-action'>
					<HeartOutlined />
				</button>
			</div>
			<img
				className='card-img'
				alt='products'
				src={img1}
				onMouseMove={(e) => (e.target.src = img2)}
				onMouseOut={(e) => (e.target.src = img1)}
			/>
			<div className='card-info'>
				<h3 className='product-name'>
					Apple - Watch Series 3 with White Sport Band
				</h3>
				<div className='product-price'>
					<span className='old-price price mr-6'>$ 22.99</span>
					<span className='new-price price'>$ 20.99</span>
				</div>
				{showRating(3)}
				<span className='product-review ml-2'>{`( 2 ${t(
					'homePage.review'
				)} )`}</span>
			</div>
		</Card>
	);
}

export default ProductCard;
