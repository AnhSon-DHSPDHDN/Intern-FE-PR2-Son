import React from 'react';
import { Col, Divider, Row } from 'antd';

import logo from 'assets/imgs/logo-rm.png';
import payment from 'assets/imgs/payments.png';
import './style.scss';

const footer = {
	userFullLink: [
		'About Molla',
		'Our Services',
		'How to shop on Molla',
		'FAQ',
		'Contact us',
	],
	customService: [
		'Payment Methods',
		'Money-back guarantee!',
		'Returns',
		'Shipping',
		'Terms and conditions',
		'Privacy Policy',
	],
	myAccount: ['Sign In', 'View Cart', 'My Wishlist', 'Track My Order', 'Help'],
};

function Footer() {
	const mapListFooter = (data) => {
		return data.map((item, index) => {
			return (
				<a href='/' key={index} className='footer-link'>
					{item}
				</a>
			);
		});
	};

	return (
		<footer id='footer'>
			<div className='footer container'>
				<Row gutter={[16, 16]}>
					<Col xs={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
						<img src={logo} alt='logo footer'></img>
						<p>
							Praesent dapibus, neque id cursus ucibus, tortor neque egestas
							augue, eu vulputate magna eros eu erat.
						</p>
					</Col>
					<Col xs={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
						<h3>Useful Links</h3>
						{mapListFooter(footer.userFullLink)}
					</Col>
					<Col xs={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
						<h3>Customer Service</h3>
						{mapListFooter(footer.customService)}
					</Col>
					<Col xs={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
						<h3>My Account</h3>
						{mapListFooter(footer.myAccount)}
					</Col>
				</Row>
				<Divider />
				<div className='footer-bottom'>
					<p>Copyright © 2021 Anh Son Store. All Rights Reserved.</p>
					<img src={payment} alt='payment'></img>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
