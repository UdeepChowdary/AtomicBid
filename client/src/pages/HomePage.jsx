import { Link } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import './HomePage.css';

const HomePage = () => {
    const { connected } = useSocket();

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background">
                    <div className="gradient-orb orb-1"></div>
                    <div className="gradient-orb orb-2"></div>
                    <div className="gradient-orb orb-3"></div>
                </div>

                <div className="container hero-content">
                    <div className="hero-badge">
                        <span className="badge-icon">⚡</span>
                        <span>Race-Condition-Free Bidding</span>
                    </div>

                    <h1 className="hero-title">
                        The Future of
                        <br />
                        <span className="gradient-text">Live Auctions</span>
                    </h1>

                    <p className="hero-subtitle">
                        Experience real-time bidding with atomic transaction handling.
                        No more lost bids. No more conflicts. Just pure, reliable auctions.
                    </p>

                    <div className="hero-actions">
                        <Link to="/auctions" className="btn btn-primary btn-lg">
                            <span>Explore Auctions</span>
                            <span className="btn-arrow">→</span>
                        </Link>
                        <Link to="/create-auction" className="btn btn-outline btn-lg">
                            Create Auction
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-value">100%</div>
                            <div className="stat-label">Atomic</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-value">&lt;50ms</div>
                            <div className="stat-label">Latency</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className={`stat-value ${connected ? 'text-success' : 'text-error'}`}>
                                {connected ? 'Live' : 'Offline'}
                            </div>
                            <div className="stat-label">Status</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Powered by Atomic Operations</h2>
                        <p className="section-subtitle">
                            Built with cutting-edge technology to ensure fair and reliable auctions
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3 className="feature-title">Race-Condition Safe</h3>
                            <p className="feature-description">
                                MongoDB atomic operations ensure every bid is processed correctly,
                                even under extreme load.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3 className="feature-title">Real-Time Updates</h3>
                            <p className="feature-description">
                                Socket.io powered live bidding with instant updates across all
                                connected clients.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">⏱️</div>
                            <h3 className="feature-title">Synchronized Timers</h3>
                            <p className="feature-description">
                                Server-side countdown ensures all users see the exact same time,
                                preventing timing exploits.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🤖</div>
                            <h3 className="feature-title">Auto-Bidding</h3>
                            <p className="feature-description">
                                Set your maximum bid and let our system automatically bid for you
                                up to your limit.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">💳</div>
                            <h3 className="feature-title">Secure Payments</h3>
                            <p className="feature-description">
                                Integrated with Stripe for secure and seamless payment processing.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📱</div>
                            <h3 className="feature-title">Fully Responsive</h3>
                            <p className="feature-description">
                                Bid from anywhere - desktop, tablet, or mobile. Optimized for all
                                devices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <h2 className="cta-title">Ready to start bidding?</h2>
                        <p className="cta-subtitle">
                            Join thousands of users experiencing the future of online auctions
                        </p>
                        <Link to="/register" className="btn btn-accent btn-lg">
                            Get Started Free
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
