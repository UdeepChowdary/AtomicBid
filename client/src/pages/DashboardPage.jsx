import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
    const { user } = useAuth();

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <h1>Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                Welcome back, {user?.name || 'User'}!
            </p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                Dashboard features coming soon...
            </p>
        </div>
    );
};

export default DashboardPage;
