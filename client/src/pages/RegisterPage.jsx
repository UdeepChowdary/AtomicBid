import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
        setErrors((p) => ({ ...p, [e.target.name]: '' }));
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim())                        errs.name = 'Name is required';
        if (!form.email.includes('@'))                errs.email = 'Valid email required';
        if (form.password.length < 6)                 errs.password = 'Password must be at least 6 characters';
        if (form.password !== form.confirm)           errs.confirm = 'Passwords do not match';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setLoading(true);
        setApiError('');
        try {
            const res = await register(form.name, form.email, form.password);
            if (res.success) {
                navigate('/dashboard');
            } else {
                setApiError(res.error || 'Registration failed. Try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const Field = ({ id, label, name, type = 'text', placeholder, autoComplete }) => (
        <div className="form-field">
            <label className="form-label" htmlFor={id}>{label}</label>
            <input
                id={id}
                className="input"
                type={type}
                name={name}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                autoComplete={autoComplete}
            />
            {errors[name] && <span className="form-error">⚠ {errors[name]}</span>}
        </div>
    );

    return (
        <div className="auth-page">
            {/* Left panel */}
            <div className="auth-panel-left">
                <div className="auth-brand-icon">⚡</div>
                <h2 className="auth-brand-title">
                    Join the future<br />
                    <span className="gradient-text">of auctions</span>
                </h2>
                <p className="auth-brand-sub">
                    Create your free account and start bidding on exclusive items within minutes.
                    Sellers welcome too — list your first auction today.
                </p>
                <div className="auth-features">
                    {[
                        ['✅', 'Free to join, forever'],
                        ['🤖', 'Auto-bidding up to your limit'],
                        ['💳', 'Secure Stripe payments'],
                        ['📱', 'Bid from any device'],
                    ].map(([icon, label]) => (
                        <div key={label} className="auth-feature">
                            <div className="auth-feature-icon">{icon}</div>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right form */}
            <div className="auth-panel-right">
                <div className="auth-form-wrap animate-fade-up">
                    <div className="auth-form-header">
                        <h1 className="auth-form-title">Create Account</h1>
                        <p className="auth-form-sub">
                            Already have an account?{' '}
                            <Link to="/login">Sign in →</Link>
                        </p>
                    </div>

                    {apiError && (
                        <div className="auth-alert error">⚠️ {apiError}</div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <Field
                            id="reg-name"
                            label="Full Name"
                            name="name"
                            placeholder="Alex Johnson"
                            autoComplete="name"
                        />
                        <Field
                            id="reg-email"
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                        <Field
                            id="reg-password"
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Minimum 6 characters"
                            autoComplete="new-password"
                        />
                        <Field
                            id="reg-confirm"
                            label="Confirm Password"
                            name="confirm"
                            type="password"
                            placeholder="Repeat password"
                            autoComplete="new-password"
                        />

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-full"
                            style={{ marginTop: 'var(--sp-2)' }}
                            disabled={loading}
                        >
                            {loading ? <span className="btn-spinner" /> : 'Create Free Account →'}
                        </button>
                    </form>

                    <p className="text-xs text-muted" style={{ marginTop: 'var(--sp-4)', textAlign: 'center' }}>
                        By signing up, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
