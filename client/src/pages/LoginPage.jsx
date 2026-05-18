import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError('Please fill in all fields.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await login(form.email, form.password);
            if (res.success) {
                navigate('/dashboard');
            } else {
                setError(res.error || 'Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {/* Left branding panel */}
            <div className="auth-panel-left">
                <div className="auth-brand-icon">⚡</div>
                <h2 className="auth-brand-title">
                    Welcome back<br />
                    <span className="gradient-text">to AtomicBid</span>
                </h2>
                <p className="auth-brand-sub">
                    Sign in to access your dashboard, track live bids, and manage your auctions — all in real time.
                </p>
                <div className="auth-features">
                    {[
                        ['⚡', 'Real-time bid updates'],
                        ['🔒', 'Atomic, conflict-free transactions'],
                        ['📊', 'Full bid history & analytics'],
                    ].map(([icon, label]) => (
                        <div key={label} className="auth-feature">
                            <div className="auth-feature-icon">{icon}</div>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right form panel */}
            <div className="auth-panel-right">
                <div className="auth-form-wrap animate-fade-up">
                    <div className="auth-form-header">
                        <h1 className="auth-form-title">Sign In</h1>
                        <p className="auth-form-sub">
                            Don't have an account?{' '}
                            <Link to="/register">Create one free →</Link>
                        </p>
                    </div>

                    {error && (
                        <div className="auth-alert error">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-field">
                            <label className="form-label" htmlFor="login-email">Email</label>
                            <div className="input-wrapper">
                                <input
                                    id="login-email"
                                    className="input"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <label className="form-label" htmlFor="login-password">Password</label>
                            <div className="input-wrapper">
                                <input
                                    id="login-password"
                                    className="input"
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-full"
                            style={{ marginTop: 'var(--sp-2)' }}
                            disabled={loading}
                        >
                            {loading ? <span className="btn-spinner" /> : 'Sign In →'}
                        </button>
                    </form>

                    <div className="auth-divider">or continue with</div>

                    <button className="btn btn-outline btn-lg w-full" disabled>
                        🔐 Google (coming soon)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
