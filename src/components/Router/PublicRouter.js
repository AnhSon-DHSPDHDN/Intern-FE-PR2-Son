import React from 'react';
import { Redirect } from 'react-router';

import HomePageLayout from 'layouts/HomePageLayout';

function PublicRouter(props) {
	const { isAuth, children } = props;
	if (isAuth) return <Redirect to='/admin' />;
	return <HomePageLayout>{children}</HomePageLayout>;
}

export default PublicRouter;
