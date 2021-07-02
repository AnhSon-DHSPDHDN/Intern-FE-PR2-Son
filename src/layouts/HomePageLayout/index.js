import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { BackTop } from 'antd';

export default function HomePageLayout({ children }) {
	return (
		<div className='home-layout'>
			<Header />
			{children}
			<BackTop />
			<Footer />
		</div>
	);
}
