import Route from './Route';
import Router, { Routes } from './Router';
import About from './views/About';
import Home from './views/Home';
import Info from './views/Info';

type RouteComponent = (...props: any) => JSX.Element;
export interface RouteProps {
	path: string;
	component: RouteComponent;
}

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/about',
		component: About
	},
	{
		path: '/about/:id',
		component: About
	}
] satisfies Routes[];

export default function App() {
	return (
		<main>
			<Router routes={routes}>
				<Route path="/info" component={Info} />
				<Route path="/comercio" component={() => <h1>Comercio</h1>} />
			</Router>
		</main>
	);
}
