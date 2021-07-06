import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';

import { adminRouter, appRouter } from 'constants/routers';
import PublicRouter from 'components/Router/PublicRouter';
import PrivateRouter from 'components/Router/PrivateRouter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actGetProfile } from 'redux/actions/authAction';

function App() {
	const accessToken = localStorage.getItem('accessToken') || null;
	const dispatch = useDispatch();
	const authUser = useSelector((state) => state.auth);

	useEffect(() => {
		if (accessToken) {
			dispatch(actGetProfile(accessToken));
		}
	}, [accessToken, dispatch]);

	return (
		<Suspense fallback={<Spin />}>
			<BrowserRouter>
				<Switch>
					{appRouter.map((c, index) => {
						const Component = c.component;
						return (
							<Route
								key={index}
								exact={c.isExact}
								path={c.path}
								render={() => (
									<PublicRouter isAuth={authUser.isAuthenticated}>
										<Component />
									</PublicRouter>
								)}
							></Route>
						);
					})}
					{adminRouter.map((c, index) => {
						const Component = c.component;
						return (
							<Route
								key={index}
								exact={c.isExact}
								path={c.path}
								render={() => (
									<PrivateRouter isAuth={authUser.isAuthenticated}>
										<Component />
									</PrivateRouter>
								)}
							></Route>
						);
					})}
					{authUser.isAuthenticated ? (
						<Redirect to='/admin' />
					) : (
						<Redirect to='/' />
					)}
				</Switch>
			</BrowserRouter>
		</Suspense>
	);
}

export default App;
