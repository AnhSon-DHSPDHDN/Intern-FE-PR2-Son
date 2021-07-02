import {
	Col,
	Collapse,
	Divider,
	Row,
	Checkbox,
	Slider,
	Pagination,
} from 'antd';
import ProductCard from 'components/Card';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './style.scss';

const { Panel } = Collapse;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['New', 'Sale', 'Hot'];
const defaultCheckedList = [];

function Products() {
	const { t } = useTranslation();
	const [filterPrice, setFilterPrice] = useState([0, 0]);
	const [checkedListTags, setCheckedListTags] = useState(defaultCheckedList);
	const [indeterminate, setIndeterminate] = useState(false);
	const [checkAll, setCheckAll] = useState(false);

	const onChangeTags = (list) => {
		setCheckedListTags(list);
		setIndeterminate(list.length && list.length < plainOptions.length);
		setCheckAll(list.length === plainOptions.length);
	};

	const onCheckAllChange = (e) => {
		setCheckedListTags(e.target.checked ? plainOptions : []);
		setIndeterminate(false);
		setCheckAll(e.target.checked);
	};

	const listCategories = [
		{ name: 'furniture', label: t('productPage.categories.furniture') },
		{ name: 'coffee-tables', label: t('productPage.categories.coffeeTable') },
		{ name: 'lighting', label: t('productPage.categories.lighting') },
		{ name: 'decoration', label: t('productPage.categories.decoration') },
		{ name: 'electronics', label: t('productPage.categories.electronics') },
		{ name: 'beds', label: t('productPage.categories.beds') },
		{ name: 'armchairs', label: t('productPage.categories.armchairs') },
		{ name: 'sofas', label: t('productPage.categories.sofas') },
	];

	const listBrands = [
		{ name: 'nike', label: t('productPage.brands.nike') },
		{ name: 'samsung', label: t('productPage.brands.samsung') },
		{ name: 'apple', label: t('productPage.brands.apple') },
		{ name: 'cootmate', label: t('productPage.brands.coolmate') },
	];

	const handleChangePrice = (value) => {
		setFilterPrice(value);
	};

	const mapCategories = (data) => {
		return data.map((data, index) => {
			return (
				<li className='list-category__item my-1' key={index} name={data.name}>
					{data.label}
				</li>
			);
		});
	};

	return (
		<section id='products-page'>
			<div className='container mt-8 mb-8'>
				<Row gutter={[16, 16]}>
					<Col
						xs={{ span: 24 }}
						sm={{ span: 12 }}
						lg={{ span: 8 }}
						xl={{ span: 6 }}
					>
						<div className='clear-container'>
							<span className='title fw-6'>{t('productPage.filter')}</span>
							<button className='clear clear-btn'>
								{t('productPage.clearAll')}
							</button>
						</div>
						<Divider />
						<Collapse
							defaultActiveKey={['category']}
							expandIconPosition={'right'}
							ghost
							className='collapse'
						>
							<Panel
								className='panel-header'
								header={t('productPage.category')}
								key={'category'}
							>
								<ul className='list-category pl-1'>
									{mapCategories(listCategories)}
								</ul>
							</Panel>
							<hr className='break-line' />
							<Panel
								className='panel-header'
								header={t('productPage.tags')}
								key={'tags'}
							>
								<div className='list-checkbox--tags'>
									<Checkbox
										indeterminate={indeterminate}
										onChange={onCheckAllChange}
										checked={checkAll}
									>
										{t('productPage.all')}
									</Checkbox>
									<CheckboxGroup
										options={plainOptions}
										value={checkedListTags}
										onChange={onChangeTags}
									/>
								</div>
							</Panel>
							<hr className='break-line' />
							<Panel
								className='panel-header'
								header={t('productPage.brand')}
								key={'brand'}
							>
								<ul className='list-category pl-1'>
									{mapCategories(listBrands)}
								</ul>
							</Panel>
							<hr className='break-line' />
							<Panel
								className='panel-header panel-price'
								header={t('productPage.price')}
								key={'price'}
							>
								<div className='filter-price'>
									<span>
										{t('productPage.priceRange')}
										<strong>
											${filterPrice[0]}-${filterPrice[1]}
										</strong>
									</span>
									<button className='submit-price'>
										{t('productPage.goFilter')}
									</button>
								</div>
								<Slider
									min={0}
									max={10000}
									step={100}
									range
									onChange={handleChangePrice}
								/>
							</Panel>
						</Collapse>
					</Col>
					<Col
						xs={{ span: 24 }}
						sm={{ span: 12 }}
						lg={{ span: 16 }}
						xl={{ span: 18 }}
					>
						<div className='sort-by'>
							<span className='fw-6 mr-4'>{t('productPage.sortBy')}</span>
							<select className='sort-input' id='input-sort'>
								<option value=''>{t('productPage.default')}</option>
								<option value='asc'>{t('productPage.asc')}</option>
								<option value='desc'>{t('productPage.desc')}</option>
							</select>
						</div>
						<Row gutter={[16, 16]} className='mt-4 product-list'>
							<Col
								lg={{ span: 12 }}
								xs={{ span: 24 }}
								sm={{ span: 24 }}
								xl={{ span: 8 }}
							>
								<ProductCard />
							</Col>
						</Row>
						<Pagination
							className='text-center mt-4'
							defaultCurrent={1}
							total={50}
						/>
					</Col>
				</Row>
			</div>
		</section>
	);
}

export default Products;
