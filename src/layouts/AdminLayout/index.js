import React, { useEffect, useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import {
	DesktopOutlined,
	LogoutOutlined,
	PieChartOutlined,
	UserOutlined,
} from '@ant-design/icons';
import Logo from 'assets/imgs/logo-rm.png';
import { Link, useRouteMatch } from 'react-router-dom';
import { actLogout } from 'redux/actions/authAction';
import { useDispatch } from 'react-redux';
import { AdminPage } from 'constants/pages';

const { Header, Content, Footer, Sider } = Layout;

function AdminLayout({ children }) {
	const [collapsed, setCollapsed] = useState(false);
	const dispatch = useDispatch();
	const { path } = useRouteMatch();

	const handleLogout = () => {
		dispatch(actLogout());
	};

	useEffect(() => {
		document.title = 'Admin';
	}, []);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={() => setCollapsed(!collapsed)}
			>
				<div className='logo'>
					<img src={Logo} alt='logo' width='100%' />
				</div>
				<Menu theme='dark' defaultSelectedKeys={[path]} mode='inline'>
					<Menu.Item key={AdminPage.OVERVIEW} icon={<PieChartOutlined />}>
						<Link to={AdminPage.OVERVIEW}>Overview</Link>
					</Menu.Item>
					<Menu.Item key={AdminPage.ADMIN_PRODUCTS} icon={<DesktopOutlined />}>
						<Link to={AdminPage.ADMIN_PRODUCTS}>Products</Link>
					</Menu.Item>
					<Menu.Item key={AdminPage.ADMIN_USERS} icon={<UserOutlined />}>
						<Link to={AdminPage.ADMIN_USERS}>Users</Link>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className='site-layout'>
				<Header className='site-layout-background' style={{ padding: 0 }}>
					<Button
						type='primary'
						style={{ position: 'absolute', right: '40px', top: '15px' }}
						onClick={handleLogout}
					>
						<LogoutOutlined /> Logout
					</Button>
				</Header>
				<Content style={{ margin: '0 16px' }}>
					<div
						className='site-layout-background'
						style={{ padding: 24, minHeight: 360 }}
					>
						{children}
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Anh Son FE - PJ_02</Footer>
			</Layout>
		</Layout>
	);
}

export default AdminLayout;
