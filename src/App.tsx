import { lazy, Suspense } from 'react';
import Route from './Route';
import Router, { Routes } from './Router';
import Info from './views/Info';

type RouteComponent = (...props: any) => JSX.Element;
export interface RouteProps {
	path: string;
	component: RouteComponent;
}

const routes = [
	{
		path: '/',
		component: lazy(() => import('./views/Home'))
	},
	{
		path: '/about',
		component: lazy(() => import('./views/About'))
	},
	{
		path: '/about/:id',
		component: lazy(() => import('./views/About'))
	}
] satisfies Routes[];

export default function App() {
	return (
		<main>
			<Suspense fallback={<h1>Cargando..</h1>}>
				<Router routes={routes}>
					<Route path="/info" component={Info} />
					<Route
						path="/comercio"
						component={() => <h1>Comercio</h1>}
					/>
				</Router>
			</Suspense>
		</main>
	);
}
