import Route from './Route';
import Router from './Router';
import About from './views/About';
import Home from './views/Home';

export interface Routes {
	path: string;
	component: (...props: any) => JSX.Element;
	routeParams?: any;
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
				<Route path="/" component={Home} />
			</Router>
		</main>
	);
}
