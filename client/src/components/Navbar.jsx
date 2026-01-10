import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { connected } = useSocket();

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">⚡</span>
                    <span className="logo-text">AtomicBid</span>
                </Link>

                <div className="navbar-links">
                    <Link to="/auctions" className="nav-link">Auctions</Link>

                    {isAuthenticated ? (
                        <>
                            <Link to="/create-auction" className="nav-link">Create</Link>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <button onClick={logout} className="btn btn-secondary">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="btn btn-primary">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                <div className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
                    <span className="status-dot"></span>
                    <span className="status-text">{connected ? 'Live' : 'Offline'}</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
