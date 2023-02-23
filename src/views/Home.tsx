import Link from '../Link';

function Home() {
	return (
		<>
			<h1>Home</h1>
			<p>coso</p>
			<Link to="/about">sobre nosotros</Link>{' '}
			<Link to="/info">Infografia</Link>
		</>
	);
}

export default Home;
