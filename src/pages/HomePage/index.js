import React, { useEffect } from 'react';
import { Carousel, Col, Divider, Row } from 'antd';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
	CaretLeftOutlined,
	CaretRightOutlined,
	FacebookOutlined,
	InstagramOutlined,
	SkypeOutlined,
	YoutubeOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import './style.scss';
import ProductCard from 'components/Card';
import { Link } from 'react-router-dom';
import brand1 from 'assets/brand/1.png';
import brand2 from 'assets/brand/2.png';
import brand3 from 'assets/brand/3.png';
import brand4 from 'assets/brand/4.png';
import brand5 from 'assets/brand/5.png';
import brand6 from 'assets/brand/6.png';
import brand7 from 'assets/brand/7.png';
import brand8 from 'assets/brand/8.png';
import brand9 from 'assets/brand/9.png';
import { useDispatch, useSelector } from 'react-redux';
import { actGetProductsHome } from 'redux/actions/productAction';

function NextArrow(props) {
	const { onClick } = props;
	return (
		<button className='btn-next' onClick={onClick}>
			<CaretRightOutlined />
		</button>
	);
}

function PrevArrow(props) {
	const { onClick } = props;
	return (
		<button className='btn-prev' onClick={onClick}>
			<CaretLeftOutlined />
		</button>
	);
}

const listBrand = [
	brand1,
	brand2,
	brand3,
	brand4,
	brand5,
	brand6,
	brand7,
	brand8,
	brand9,
];

const settingsBrand = {
	infinite: true,
	speed: 500,
	slidesToShow: 6,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1,
				infinite: true,
			},
		},
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1,
				infinite: true,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
			},
		},
	],
};

function HomePage() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { productSales, productNews, isLoading } = useSelector(
		(state) => state.productReducer
	);
	const productLimit = productSales.slice(0, 2);
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	const mapListBrand = (data) => {
		return data.map((src, index) => {
			return (
				<div key={index} className='img-brand'>
					<img src={src} alt={src}></img>
				</div>
			);
		});
	};

	const mapListProduct = (list) => {
		return list.map((product) => {
			return <ProductCard key={product.id} product={product} />;
		});
	};

	const mapProductLimit = (list) => {
		return list.map((product) => {
			return (
				<Col
					lg={{ span: 6 }}
					sm={{ span: 12 }}
					xs={{ span: 24 }}
					key={product.id}
				>
					<ProductCard product={product} />
				</Col>
			);
		});
	};

	useEffect(() => {
		document.title = 'Son Sun*';
		dispatch(actGetProductsHome());
	}, [dispatch]);

	return (
		<section id='home-page'>
			<div className='banner container mt-8 mb-8'>
				<Row gutter={16}>
					<Col lg={{ span: 16 }} sm={{ span: 24 }} xs={{ span: 24 }}>
						<Carousel className='banner__carousel' autoplay>
							<div className='carousel-1'>
								<p className='daily'>{t('homePage.daily')}</p>
								<h1 className='name'>AirPods</h1>
								<h1 className='name'>Earphones</h1>
								<div className='price-deals'>
									<span className='price-deals__today'>
										{t('homePage.today')}
									</span>
									<span className='price-deals__price'>$247.99</span>
								</div>
								<Link to='/products' className='link'>
									{t('homePage.clickHere')}
								</Link>
							</div>
							<div className='carousel-2'>
								<p className='daily'>{t('homePage.daily')}</p>
								<h1 className='name'>Echo Dot</h1>
								<h1 className='name'>3rd Gen</h1>
								<div className='price-deals'>
									<span className='price-deals__today'>
										{t('homePage.today')}
									</span>
									<span className='price-deals__price'>$29.99</span>
								</div>
								<Link className='link' to='/products'>
									{t('homePage.clickHere')}
								</Link>
							</div>
						</Carousel>
					</Col>
					<Col lg={{ span: 8 }} sm={{ span: 24 }} xs={{ span: 24 }}>
						<div className='banner__1 mb-5'>
							<p className='title'>{t('homePage.topProduct')}</p>
							<h4 className='name'>
								Edifier <br /> Stereo Bluetooth
							</h4>
							<Link to='/products' className='link'>
								{t('homePage.clickHere')}
							</Link>
						</div>
						<div className='banner__2 mb-5'>
							<p className='title'>{t('homePage.clearance')}</p>
							<h4 className='name'>
								Go Pro <br /> Fusion 360
							</h4>
							<Link to='/products' className='link'>
								{t('homePage.clickHere')}
							</Link>
						</div>
						<div className='banner__3'>
							<p className='title'>{t('homePage.featured')}</p>
							<h4 className='name'>
								Apple Watch <br /> Series 4
							</h4>
							<Link to='/products' className='link'>
								{t('homePage.clickHere')}
							</Link>
						</div>
					</Col>
				</Row>
			</div>
			<div className='selling-product container'>
				<h1>{t('homePage.productSale')}</h1>
				<Slider {...settings}>
					{isLoading ? (
						<ProductCard loading={isLoading} />
					) : (
						mapListProduct(productSales)
					)}
				</Slider>
			</div>
			<div className='banner-1 container mt-10'>
				<div className='banner-1__bg-img'>
					<div className='contents'>
						<div className='contents__left'>
							<h4 className='new-deal'>{t('homePage.newDeals')}</h4>
							<h4 className='new-time'>{t('homePage.newDealsTime')}</h4>
						</div>
						<div className='contents__center'>
							<span>
								GetFREE SHIPPING* & 5% rewards on <br />
								every order with Molla Theme rewards program
							</span>
						</div>
						<button className='btn-add'>{t('homePage.addToCart')}</button>
					</div>
				</div>
			</div>
			<div className='banner-2 container mt-10'>
				<h2 className='text-center'>{t('homePage.dealOutlet')}</h2>
				<Row>
					<Col
						lg={{ span: 12 }}
						sm={{ span: 24 }}
						xs={{ span: 24 }}
						className='pt-2 pb-2'
					>
						<div className='deal-of-day pt-10	pl-10'>
							<span className='content'>
								<h1 className='title mb-0'> {t('homePage.dealOfTheDay')}</h1>
								<p className='des'> {t('homePage.limitedQuantity')}</p>
							</span>
						</div>
					</Col>
					{isLoading ? (
						<>
							<Col lg={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 24 }}>
								<ProductCard />
							</Col>
							<Col lg={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 24 }}>
								<ProductCard />
							</Col>
						</>
					) : (
						mapProductLimit(productLimit)
					)}
				</Row>
			</div>
			<div className='partner container mt-10'>
				<Slider {...settingsBrand}>{mapListBrand(listBrand)}</Slider>
			</div>
			<div className='selling-product new-product container mt-8'>
				<h1>{t('homePage.productNew')}</h1>
				<Slider {...settings}>
					{isLoading ? (
						<ProductCard loading={isLoading} />
					) : (
						mapListProduct(productNews)
					)}
				</Slider>
				<Divider />
			</div>
			<div className='service container mt-8'>
				<Row gutter={[16, 16]}>
					<Col lg={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 24 }}>
						<div className='service__item text-center'>
							<h1 className='m-0'>{t('homePage.service.shipping')}</h1>
							<h3 className='fw-4'>{t('homePage.service.shippingDetail')}</h3>
						</div>
					</Col>
					<Col lg={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 24 }}>
						<div className='service__item text-center'>
							<h1 className='m-0'>{t('homePage.service.return')}</h1>
							<h3 className='fw-4'>{t('homePage.service.returnDetail')}</h3>
						</div>
					</Col>
					<Col lg={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 24 }}>
						<div className='service__item text-center'>
							<h1 className='m-0'>{t('homePage.service.free20')}</h1>
							<h3 className='fw-4'>{t('homePage.service.free20Detail')}</h3>
						</div>
					</Col>
					<Col lg={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 24 }}>
						<div className='service__item text-center'>
							<h1 className='m-0'>{t('homePage.service.support')}</h1>
							<h3 className='fw-4'>{t('homePage.service.supportDetail')}</h3>
						</div>
					</Col>
				</Row>
			</div>
			<div className='banner-3 container mt-10 mb-12'>
				<div className='banner-3__bg'>
					<div className='content'>
						<h1 className='content__title'>{t('homePage.shopSocial')}</h1>
						<p className='content__des'>
							Donec nec justo eget felis facilisis fermentum.
							<br />
							Aliquam porttitor mauris sit amet orci.
						</p>
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
			</div>
		</section>
	);
}

export default HomePage;
