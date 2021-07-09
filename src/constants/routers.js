import React from 'react';

export const appRouter = [
	{
		isExact: true,
		path: '/login',
		component: React.lazy(() => import('pages/Login')),
	},
	{
		isExact: true,
		path: '/register',
		component: React.lazy(() => import('pages/Register')),
	},
	{
		isExact: true,
		path: '/blogs',
		component: React.lazy(() => import('pages/Blogs')),
	},
	{
		isExact: true,
		path: '/',
		component: React.lazy(() => import('pages/HomePage')),
	},
	{
		isExact: true,
		path: '/products/:id',
		component: React.lazy(() => import('pages/DetailProduct')),
	},
	{
		isExact: true,
		path: '/products',
		component: React.lazy(() => import('pages/Products')),
	},
	{
		isExact: true,
		path: '/shop',
		component: React.lazy(() => import('pages/Shop')),
	},
	{
		isExact: true,
		path: '/contacts',
		component: React.lazy(() => import('pages/Contacts')),
	},
	{
		isExact: true,
		path: '/cart',
		component: React.lazy(() => import('pages/Cart')),
	},
	{
		isExact: true,
		path: '/profile',
		component: React.lazy(() => import('pages/Profile')),
	},
];

export const adminRouter = [
	{
		isExact: true,
		path: '/admin',
		component: React.lazy(() => import('pages/Admins')),
	},
];
