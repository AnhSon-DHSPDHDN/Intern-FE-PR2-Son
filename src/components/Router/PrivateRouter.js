import AdminLayout from 'layouts/AdminLayout';
import React from 'react';
import { Redirect } from 'react-router-dom';

function PrivateRouter(props) {
	const { isAuth, children } = props;
	if (!isAuth) return <Redirect to='/login' />;
	return <AdminLayout>{children}</AdminLayout>;
}

export default PrivateRouter;
