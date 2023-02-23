import Route from './Route';
import Router from './Router';
import About from './views/About';
import Home from './views/Home';
import Info from './views/Info';

export interface Routes {
	path: string;
	component: (...props: any) => JSX.Element;
	routeParams?: {};
}

const routes: Routes[] = [
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
];

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
