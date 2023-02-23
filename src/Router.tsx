import React, { Children, useEffect, useState } from 'react';
import { match, MatchResult } from 'path-to-regexp';
import { EVENTS } from './const';

export interface Routes {
	path: string;
	component: React.ComponentType<any>;
	routeParams?: Record<string, string>;
}

interface RouterProps {
	routes: Routes[];
	defaultComponent?: () => JSX.Element;
	children?: React.ReactNode;
}

function Router({
	children,
	routes = [],
	defaultComponent: DefaultComponent = () => <div>404</div>
}: RouterProps) {
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

	let routeParams: Record<string, string> = {};

	//add children routes of <Route> to routes
	const routesFromChildren: Routes[] = Children.toArray(children).map(
		(child: any) => child.props
	);

	routes = [...routes, ...routesFromChildren];

	const Component = routes.find(({ path }) => {
		if (path === currentPath) return true;
		const urlMatcher = match(path, { decode: decodeURIComponent });
		const matched: MatchResult<any> | false = urlMatcher(currentPath);
		if (!matched) return false;
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
