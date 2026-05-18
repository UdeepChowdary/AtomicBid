import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth }   from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import './Navbar.css';

const NAV_LINKS = [
    { to: '/auctions', label: 'Auctions' },
    { to: '/dashboard', label: 'Dashboard' },
];

const Navbar = () => {
    const { user, logout }   = useAuth();
    const { connected }      = useSocket();
    const [scrolled, setScrolled]   = useState(false);
    const [drawerOpen, setDrawer]   = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const initials = user?.name
        ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2)
        : '';

    return (
        <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
            <div className="navbar-inner">
                {/* Logo */}
                <Link to="/" className="nav-logo" onClick={() => setDrawer(false)}>
                    <div className="nav-logo-icon">
                        <img src="/favicon.svg" alt="AtomicBid Logo" />
                    </div>
                    <span className="nav-logo-name">
                        Atomic<span>Bid</span>
                    </span>
                </Link>

                {/* Desktop links */}
                <ul className="nav-links">
                    {NAV_LINKS.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="nav-actions">
                    {/* Connection pill */}
                    <div className={`conn-pill ${connected ? 'online' : 'offline'}`}>
                        <span className="conn-dot" />
                        {connected ? 'Live' : 'Offline'}
                    </div>

                    {user ? (
                        <>
                            <div
                                className="nav-avatar"
                                title={user.name}
                                onClick={logout}
                            >
                                {initials || '?'}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login"    className="btn btn-ghost btn-sm">Sign In</Link>
                            <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
                        </>
                    )}

                    {/* Hamburger */}
                    <button
                        className={`nav-hamburger${drawerOpen ? ' open' : ''}`}
                        onClick={() => setDrawer(d => !d)}
                        aria-label="Toggle menu"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            <div className={`nav-drawer${drawerOpen ? ' open' : ''}`}>
                {NAV_LINKS.map(({ to, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className="drawer-link"
                        onClick={() => setDrawer(false)}
                    >
                        {label}
                    </Link>
                ))}
                {!user && (
                    <>
                        <Link to="/login"    className="btn btn-ghost"   onClick={() => setDrawer(false)}>Sign In</Link>
                        <Link to="/register" className="btn btn-primary" onClick={() => setDrawer(false)}>Get Started</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
