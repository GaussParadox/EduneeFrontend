import { Outlet } from 'react-router-dom';

    const Layout = () => {
    return (
        <div className="app-layout">
        <header className="app-header">
            <nav>
            <h1>Edunee</h1>
            {/* Agregar navegación aquí */}
            </nav>
        </header>
        
        <main className="app-main">
            <Outlet />
        </main>
        
        <footer className="app-footer">
            <p>&copy; 2026 Edunee. Todos los derechos reservados.</p>
        </footer>
        </div>
    );
    };

    export default Layout;
