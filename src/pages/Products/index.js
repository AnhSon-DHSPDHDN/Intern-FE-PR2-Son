import {
	Col,
	Collapse,
	Divider,
	Row,
	Checkbox,
	Slider,
	Pagination,
	Spin,
} from 'antd';
import ProductCard from 'components/Card';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
	actChangePageProduct,
	actFiltersProduct,
	actGetProductsPage,
} from 'redux/actions/productAction';

import './style.scss';

const { Panel } = Collapse;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['New', 'Sale', 'Hot'];
const defaultCheckedList = [];
const paginationInit = {
	_page: 1,
	_limit: 6,
};

function Products() {
	const { t } = useTranslation();
	const [filterPrice, setFilterPrice] = useState([0, 0]);
	const [checkedListTags, setCheckedListTags] = useState(defaultCheckedList);
	const [indeterminate, setIndeterminate] = useState(false);
	const [checkAll, setCheckAll] = useState(false);
	const dispatch = useDispatch();
	const { productInPage, pagination, isLoading } = useSelector(
		(state) => state.productReducer
	);
	const [filters, setFilter] = useState({});

	const onChangeTags = (list) => {
		setCheckedListTags(list);
		setFilter({
			...filters,
			tags_like: list.map((list) => list.toLowerCase()),
		});
		setIndeterminate(list.length && list.length < plainOptions.length);
		setCheckAll(list.length === plainOptions.length);
	};

	const onCheckAllChange = (e) => {
		setCheckedListTags(e.target.checked ? plainOptions : []);
		setIndeterminate(false);
		setCheckAll(e.target.checked);
		if (e.target.checked) {
			setFilter({
				...filters,
				tags_like: plainOptions.map((list) => list.toLowerCase()),
			});
		} else {
			const filtersClone = { ...filters };
			delete filtersClone.tags_like;
			setFilter({ ...filtersClone });
		}
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
		{ name: 'coolmate', label: t('productPage.brands.coolmate') },
	];

	const handleChangePrice = (value) => {
		setFilterPrice(value);
	};

	const handleFilterPrice = () => {
		setFilter({
			...filters,
			priceNew_gte: filterPrice[0],
			priceNew_lte: filterPrice[1],
		});
	};

	const handleChangeSort = (e) => {
		const { value } = e.target;
		if (value) {
			setFilter({
				...filters,
				_sort: 'priceNew',
				_order: value,
			});
		} else {
			const cloneFilters = { ...filters };
			delete cloneFilters._sort;
			delete cloneFilters._order;
			setFilter({ ...cloneFilters });
		}
	};

	const handleChangePage = (current, size) => {
		const pagination = {
			_page: current,
			_limit: size,
		};
		window.scrollTo(0, 0);
		dispatch(actChangePageProduct({ ...pagination, ...filters }));
	};

	const handleChangeCategory = (e) => {
		setFilter({
			...filters,
			category: e.target.getAttribute('name'),
		});
	};

	const handleChangeBrand = (e) => {
		setFilter({
			...filters,
			brand: e.target.getAttribute('name'),
		});
	};

	const handleClickClear = () => {
		setFilter({});
		setCheckedListTags([]);
		setIndeterminate(false);
		setCheckAll(false);
	};

	const mapBrands = (data) => {
		return data.map((data, index) => {
			return (
				<li
					className={`list-category__item my-1 ${
						filters.brand === data.name ? 'active' : null
					}`}
					key={index}
					name={data.name}
					onClick={handleChangeBrand}
				>
					{data.label}
				</li>
			);
		});
	};

	const mapCategories = (data) => {
		return data.map((data, index) => {
			return (
				<li
					className={`list-category__item my-1 ${
						filters.category === data.name ? 'active' : null
					}`}
					key={index}
					name={data.name}
					onClick={handleChangeCategory}
				>
					{data.label}
				</li>
			);
		});
	};

	const mapProductsList = (products) => {
		if (!products.length) return <p>{t('noProduct')}</p>;
		return products.map((product) => {
			return (
				<Col
					lg={{ span: 12 }}
					xs={{ span: 24 }}
					sm={{ span: 24 }}
					xl={{ span: 8 }}
					key={product.id}
				>
					<ProductCard product={product} />
				</Col>
			);
		});
	};

	useEffect(() => {
		if (Object.keys(filters).length) {
			dispatch(actFiltersProduct({ ...filters, ...paginationInit }));
		} else {
			dispatch(actGetProductsPage(paginationInit));
		}
	}, [filters, dispatch]);

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
							<button className='clear clear-btn' onClick={handleClickClear}>
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
								<ul className='list-category pl-1'>{mapBrands(listBrands)}</ul>
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
									<button className='submit-price' onClick={handleFilterPrice}>
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
							<select
								className='sort-input'
								id='input-sort'
								onChange={handleChangeSort}
							>
								<option value=''>{t('productPage.default')}</option>
								<option value='asc'>{t('productPage.asc')}</option>
								<option value='desc'>{t('productPage.desc')}</option>
							</select>
						</div>
						<Row gutter={[16, 16]} className='mt-4 product-list'>
							{isLoading ? (
								<Spin className='spin__antd' />
							) : (
								mapProductsList(productInPage)
							)}
						</Row>
						<Pagination
							className='text-center mt-4'
							current={pagination?.currentPage}
							defaultPageSize='6'
							pageSizeOptions={['6', '9']}
							total={pagination?.total}
							onChange={handleChangePage}
						/>
					</Col>
				</Row>
			</div>
		</section>
	);
}

export default Products;
