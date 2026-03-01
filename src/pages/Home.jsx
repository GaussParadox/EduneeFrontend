import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page">
        <h1>Bienvenido a Edunee</h1>
        <p>Tu plataforma educativa</p>
        <div style={{ marginTop: '2rem' }}>
            <Link
            to="/login"
            style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
            }}
            >
            Ir al Login
            </Link>
        </div>
        </div>
    );
};

export default Home;
