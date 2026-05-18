import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import './HomePage.css';

const FEATURES = [
    { icon: '🔒', name: 'Race-Condition Safe',    desc: 'MongoDB atomic operations guarantee every bid is processed correctly under any concurrent load.' },
    { icon: '⚡', name: 'Sub-50ms Real-Time',     desc: 'Socket.io delivers every bid, counter, and event to all clients in under 50 milliseconds.' },
    { icon: '⏱️', name: 'Server-Side Timers',    desc: 'Countdown clocks run server-side. No client-side exploits, no extended windows, no cheating.' },
    { icon: '🤖', name: 'Smart Auto-Bidding',     desc: 'Set your max price. Our engine bids incrementally for you until your limit is hit.' },
    { icon: '💳', name: 'Stripe Payments',         desc: 'Winnings settled instantly through Stripe. Funds held in escrow, released on confirmation.' },
    { icon: '📡', name: 'Global Infrastructure',  desc: 'Edge-deployed WebSocket nodes ensure low latency regardless of where in the world you bid from.' },
];

const BID_FEED = [
    { user: 'AJ',  name: '@alex_j',    amount: '$5,400', color: '#7c3aed' },
    { user: 'MR',  name: '@mr_bids',   amount: '$5,200', color: '#0ea5e9' },
    { user: 'TK',  name: '@tkwatches', amount: '$5,050', color: '#10b981' },
];

const HomePage = () => {
    const { connected } = useSocket();
    const [bidValue, setBidValue] = useState(5400);

    /* animate bid ticking every 3.5 s */
    useEffect(() => {
        const id = setInterval(() => {
            setBidValue(v => v + Math.floor(Math.random() * 250 + 80));
        }, 3500);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="home-page">

            {/* ════════════════════════════════════════
                HERO
            ════════════════════════════════════════ */}
            <section className="hero">
                <div className="container hero-grid">

                    {/* ── Left ── */}
                    <div className="hero-copy">
                        <div className="hero-pill">
                            <span className="hero-pill-dot" />
                            Race-Condition-Free Bidding Engine
                        </div>

                        <h1 className="hero-headline">
                            The Future of<br />
                            <span className="gradient-text">Live Auctions</span>
                        </h1>

                        <p className="hero-sub">
                            Real-time bidding backed by atomic transactions.
                            Every bid processed fairly, instantly, and without conflict —
                            even under extreme concurrent load.
                        </p>

                        <div className="hero-cta">
                            <Link to="/auctions" className="btn btn-primary btn-xl">
                                Explore Auctions →
                            </Link>
                            <Link to="/register" className="btn btn-outline btn-xl">
                                Start Selling
                            </Link>
                        </div>

                        <div className="hero-metrics">
                            <div className="metric-item">
                                <span className="metric-value">100%</span>
                                <span className="metric-label">Atomic</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-value">&lt;50ms</span>
                                <span className="metric-label">Latency</span>
                            </div>
                            <div className="metric-item">
                                <span
                                    className="metric-value"
                                    style={{ color: connected ? 'var(--success)' : 'var(--error)' }}
                                >
                                    {connected ? '● Live' : '○ Offline'}
                                </span>
                                <span className="metric-label">Network</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-value">0</span>
                                <span className="metric-label">Lost Bids</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Right — Auction card preview ── */}
                    <div className="hero-visual">
                        <div className="chip-live">🔥 38 bidders active</div>

                        <div className="auction-preview-card">
                            <div className="preview-top-bar">
                                <span className="preview-title">Vintage Rolex Submariner 1968</span>
                                <span className="badge badge-live">● LIVE</span>
                            </div>

                            <div className="preview-img">⌚</div>

                            <div className="preview-data">
                                <div className="preview-data-col">
                                    <div className="data-label">Current Bid</div>
                                    <div className="data-bid" key={bidValue}>
                                        ${bidValue.toLocaleString()}
                                    </div>
                                </div>
                                <div className="preview-data-col">
                                    <div className="data-label" style={{ textAlign:'right' }}>Bids</div>
                                    <div className="data-bids">52</div>
                                </div>
                            </div>

                            <div className="preview-timer">
                                <span className="timer-dot" />
                                Ends in 1h 42m 18s
                            </div>

                            {/* Live bid feed */}
                            <div className="bid-feed">
                                {BID_FEED.map((b, i) => (
                                    <div key={b.user} className="bid-feed-item">
                                        <div className="bid-feed-user">
                                            <div
                                                className="bid-feed-avatar"
                                                style={{ background: b.color }}
                                            >
                                                {b.user}
                                            </div>
                                            <span>{b.name}</span>
                                        </div>
                                        <span className="bid-feed-amount">{b.amount}</span>
                                    </div>
                                ))}
                            </div>

                            <Link to="/auctions" className="btn btn-gold w-full">
                                Place Bid →
                            </Link>
                        </div>

                        <div className="chip-notif">
                            <div className="notif-avatar">RK</div>
                            <div className="notif-body">
                                <strong>@rk_collector outbid you!</strong>
                                <span>New bid: ${(bidValue).toLocaleString()} · just now</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════
                SOCIAL PROOF
            ════════════════════════════════════════ */}
            <section className="proof-bar">
                <div className="container">
                    <div className="proof-inner">
                        <span className="proof-label">Trusted by bidders worldwide</span>

                        <div className="proof-avatars">
                            {[
                                ['AJ','#7c3aed'],['MR','#0ea5e9'],['TK','#10b981'],
                                ['SL','#f59e0b'],['PD','#ef4444'],
                            ].map(([l, bg]) => (
                                <div key={l} className="proof-avatar" style={{ background: bg }}>{l}</div>
                            ))}
                        </div>
                        <span className="proof-count text-secondary">
                            <b className="text-primary">12,400+</b> active users
                        </span>

                        <div className="proof-divider" />

                        <div className="proof-stat">
                            <div className="proof-stat-n">$48M+</div>
                            <div className="proof-stat-l">Total auction value</div>
                        </div>
                        <div className="proof-divider" />
                        <div className="proof-stat">
                            <div className="proof-stat-n">2.1M+</div>
                            <div className="proof-stat-l">Bids processed</div>
                        </div>
                        <div className="proof-divider" />
                        <div className="proof-stat">
                            <div className="proof-stat-n">99.98%</div>
                            <div className="proof-stat-l">Uptime SLA</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
                FEATURES
            ════════════════════════════════════════ */}
            <section className="features">
                <div className="container">
                    <div className="section-header">
                        <p className="section-eyebrow">Built Different</p>
                        <h2 className="section-title">
                            Powered by <span className="gradient-text">Atomic Operations</span>
                        </h2>
                        <p className="section-sub">
                            Every architectural decision made so you never lose a bid you should've won.
                        </p>
                    </div>

                    <div className="features-grid">
                        {FEATURES.map((f, i) => (
                            <div
                                key={f.name}
                                className={`feature-card card-glow-top animate-fade-up stagger-${(i % 6) + 1}`}
                            >
                                <div className="feature-icon-bg">{f.icon}</div>
                                <div className="feature-name">{f.name}</div>
                                <p className="feature-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
                CTA
            ════════════════════════════════════════ */}
            <section className="cta-wrap">
                <div className="container">
                    <div className="cta-block animate-fade-up">
                        <h2 className="cta-title">
                            Ready to place your<br />
                            <span className="gradient-text">first atomic bid?</span>
                        </h2>
                        <p className="cta-sub">
                            Join over 12,000 bidders. Free forever. No credit card required.
                        </p>
                        <div className="cta-btns">
                            <Link to="/register" className="btn btn-primary btn-xl">
                                Create Free Account
                            </Link>
                            <Link to="/auctions" className="btn btn-outline btn-xl">
                                Browse Live Auctions
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
