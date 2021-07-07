import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	HeartOutlined,
	PhoneOutlined,
	SearchOutlined,
	ShoppingCartOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Divider, Drawer } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';
import VN from 'assets/imgs/vietnam.png';
import EN from 'assets/imgs/us.jpg';
import Logo from 'assets/imgs/logo.png';
import NonAvatar from 'assets/imgs/non-avatar.jpg';
import { actLogout } from 'redux/actions/authAction';
import useCustomeHistory from 'hooks/useCustomHistory';

const navigationBar = [
	{ name: 'navigation.home', path: '/' },
	{ name: 'navigation.shop', path: '/shop' },
	{ name: 'navigation.products', path: '/products' },
	{ name: 'navigation.blogs', path: '/blogs' },
	{ name: 'navigation.contacts', path: '/contacts' },
];

function Header() {
	const [visibleDrawer, setVisibleDrawer] = useState(false);
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	const history = useCustomeHistory();
	const { isLoggIn, profile } = useSelector((state) => state.auth);
	const { flagCart } = useSelector((state) => state.cartReducer);

	const handleChangeEn = () => {
		i18n.changeLanguage('en');
	};
	const handleChangeVi = () => {
		i18n.changeLanguage('vi');
	};

	const mapNavbar = (data) => {
		return data.map((nav, index) => {
			return (
				<li key={index}>
					<Link to={nav.path}>{t(nav.name)}</Link>
				</li>
			);
		});
	};

	const handleLogout = () => {
		dispatch(actLogout());
	};

	return (
		<section id='header'>
			<div className='header header-wrap container'>
				<div className='header__top pt-2 pb-2'>
					<span className='left'>
						<PhoneOutlined className='mr-2' />
						{t('header.call')}: +84 334 965080
					</span>
					<div className='right'>
						<img
							className='right__img mr-2'
							src={VN}
							alt='vn'
							onClick={handleChangeVi}
						/>
						<img
							className='right__img'
							src={EN}
							alt='us'
							onClick={handleChangeEn}
						/>
						{isLoggIn ? (
							<span className='ml-2'>
								<Avatar src={profile.avatar || NonAvatar} />
								<button className='btn-logout ml-2' onClick={handleLogout}>
									{t('logout')}
								</button>
							</span>
						) : (
							<span className='ml-2'>
								<Link to='/login'>{t('header.signin')}</Link>/
								<Link to='/register'>{t('header.register')}</Link>
							</span>
						)}
					</div>
				</div>
				<Divider className='mt-0 mb-0' />
				<div className='header__main'>
					<div className='header__main-logo'>
						<img src={Logo} alt='logo' />
					</div>
					<div className='header__main-input'>
						<input
							className='input-search'
							placeholder={t('header.placeholder')}
							name='search-product'
						></input>
						<SearchOutlined className='icon-search' />
					</div>
					<div className='header__main-btns'>
						<span className='btn-wishlist btn-icon mr-8'>
							<HeartOutlined />
							<div className='btn-icon__notifi'>1</div>
							<div className='btn-icon__name'>{t('header.wishList')}</div>
						</span>
						<span
							className='btn-wishlist btn-icon'
							onClick={() => history.push('/cart')}
						>
							<ShoppingCartOutlined />
							<div className='btn-icon__notifi'>{flagCart}</div>
							<div className='btn-icon__name'>{t('header.cart')}</div>
						</span>
					</div>
				</div>
			</div>
			<div className='navigation-bar container'>
				<button className='nav-toggle' onClick={() => setVisibleDrawer(true)}>
					<UnorderedListOutlined />
				</button>
				<ul className='menu'>{mapNavbar(navigationBar)}</ul>
			</div>
			<Drawer
				title='Son Sun'
				placement='left'
				closable={false}
				onClose={() => setVisibleDrawer(false)}
				visible={visibleDrawer}
			>
				<ul className='menu-toggle'>{mapNavbar(navigationBar)}</ul>
			</Drawer>
		</section>
	);
}

export default Header;
