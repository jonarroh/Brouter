import { Children, useEffect, useState } from 'react';
import { match } from 'path-to-regexp';
import { Routes } from './App';
import { EVENTS } from './const';
interface Route {
	routes: Routes[];
	defaultComponent?: () => JSX.Element;
	children?: React.ReactNode;
	props?: any;
	routeParams?: any;
}

function Router({
	children,
	routes = [],
	defaultComponent: DefaultComponent = () => <div>404</div>
}: Route) {
	console.log(children);
	const [currentPath, setPath] = useState(window.location.pathname);

	useEffect(() => {
		window.addEventListener(EVENTS.PUSTSTATE, () => {
			setPath(window.location.pathname);
		});

		return () => {
			window.removeEventListener(EVENTS.PUSTSTATE, () => {
				setPath(window.location.pathname);
			});
		};
	}, []);

	let routeParams = {};

	//add children routes of <Route> to routes
	const routesFromChildren = Children.toArray(children).map(
		(child: any) => child.props
	);

	routes = [...routes, ...routesFromChildren];

	const Component = routes.find(({ path }) => {
		if (path === currentPath) return true;
		const urlMatcher = match(path, { decode: decodeURIComponent });
		const matched = urlMatcher(currentPath);
		if (!matched) return false;
		console.log(matched.params);
		routeParams = matched.params;
		return true;
	})?.component;

	return (
		<>
			{Component ? (
				<Component routeParams={routeParams} />
			) : (
				<DefaultComponent />
			)}
		</>
	);
}

export default Router;
