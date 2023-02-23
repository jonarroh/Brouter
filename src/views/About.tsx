import Link from '../Link';

function About({ routeParams }: any) {
	console.log(routeParams.id);
	return (
		<>
			<h1>About</h1>
			<p>coso</p>
			{routeParams?.id && <p>id: {routeParams.id}</p>}
			<Link to="/">Home</Link>
		</>
	);
}

export default About;
