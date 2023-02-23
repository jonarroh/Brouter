import { useEffect, useState } from 'react';
import { match } from 'path-to-regexp';
import { Routes } from './App';
import { EVENTS } from './const';
interface Route {
	routes: Routes[];
	defaultComponent?: () => JSX.Element;
	children?: React.ReactNode;
	props?: any;
}

function Router({
	routes = [],
	defaultComponent: DefaultComponent = () => <div>404</div>
}: Route) {
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

	const Component = routes.find(({ path }) => {
		if (path === currentPath) return true;
		const urlMatcher = match(path, { decode: decodeURIComponent });
		const matched = urlMatcher(currentPath);
		if (!matched) return false;

		routeParams = matched.params;
	})?.component;

	return (
		<>
			{Component ? (
				<Component routeParams={routeParams} />
			) : (
				<DefaultComponent routeParams={routeParams} />
			)}
		</>
	);
}

export default Router;
