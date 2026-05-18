import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './AuctionsPage.css';

const MOCK_AUCTIONS = [
    {
        id: '1',
        title: 'Vintage Rolex Submariner 1968',
        currentBid: 5200,
        endTime: new Date(Date.now() + 3600000 * 2.3),
        emoji: '⌚',
        bidCount: 47,
        status: 'active',
        category: 'Watches',
    },
    {
        id: '2',
        title: 'Action Comics #1 — CGC 9.0',
        currentBid: 18500,
        endTime: new Date(Date.now() + 3600000 * 5),
        emoji: '📚',
        bidCount: 83,
        status: 'active',
        category: 'Collectibles',
    },
    {
        id: '3',
        title: 'Louis XVI Mahogany Writing Desk',
        currentBid: 9800,
        endTime: new Date(Date.now() + 3600000 * 11),
        emoji: '🪑',
        bidCount: 29,
        status: 'active',
        category: 'Furniture',
    },
    {
        id: '4',
        title: 'Banksy Original — Girl with Balloon',
        currentBid: 42000,
        endTime: new Date(Date.now() + 3600000 * 0.4),
        emoji: '🎨',
        bidCount: 124,
        status: 'active',
        category: 'Art',
    },
    {
        id: '5',
        title: 'Ferrari 488 Pista Spider 2020',
        currentBid: 285000,
        endTime: new Date(Date.now() + 3600000 * 18),
        emoji: '🚗',
        bidCount: 16,
        status: 'active',
        category: 'Vehicles',
    },
    {
        id: '6',
        title: 'Gibson Les Paul 1959 Sunburst Reissue',
        currentBid: 3400,
        endTime: new Date(Date.now() + 3600000 * 7),
        emoji: '🎸',
        bidCount: 38,
        status: 'active',
        category: 'Music',
    },
];

const FILTERS = [
    { id: 'all',        label: 'All Auctions' },
    { id: 'ending',     label: '🔥 Ending Soon' },
    { id: 'new',        label: '✨ Newest' },
    { id: 'high-value', label: '💎 High Value' },
];

function useCountdown(endTime) {
    const calc = useCallback(() => {
        const diff = endTime - Date.now();
        if (diff <= 0) return { h: 0, m: 0, s: 0, total: 0 };
        return {
            h: Math.floor(diff / 3600000),
            m: Math.floor((diff % 3600000) / 60000),
            s: Math.floor((diff % 60000) / 1000),
            total: diff,
        };
    }, [endTime]);

    const [time, setTime] = useState(calc);

    useEffect(() => {
        const id = setInterval(() => setTime(calc()), 1000);
        return () => clearInterval(id);
    }, [calc]);

    return time;
}

function AuctionCountdown({ endTime }) {
    const { h, m, s, total } = useCountdown(endTime);
    const isSoon = total < 3600000; // < 1 hour

    if (total <= 0) return <span className="countdown-time">Ended</span>;

    return (
        <span className={`countdown-time ${isSoon ? 'soon' : ''}`}>
            {h > 0 ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m ${String(s).padStart(2, '0')}s`}
        </span>
    );
}

function SkeletonCard() {
    return (
        <div className="skeleton-card">
            <div className="skeleton-image" />
            <div className="skeleton-body">
                <div className="skeleton-line medium" />
                <div className="skeleton-line short" />
                <div className="skeleton-line" />
            </div>
        </div>
    );
}

const AuctionsPage = () => {
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [auctions, setAuctions] = useState([]);

    // Simulate API fetch
    useEffect(() => {
        const t = setTimeout(() => {
            setAuctions(MOCK_AUCTIONS);
            setLoading(false);
        }, 900);
        return () => clearTimeout(t);
    }, []);

    const filtered = auctions.filter((a) => {
        if (filter === 'ending') return (a.endTime - Date.now()) < 3600000 * 3;
        if (filter === 'new')    return true; // no real sort without API
        if (filter === 'high-value') return a.currentBid >= 10000;
        return true;
    });

    return (
        <div className="auctions-page">
            <div className="container">
                {/* Header */}
                <div className="auctions-header animate-fade-up">
                    <h1 className="auctions-title">
                        <span className="gradient-text">Live</span> Auctions
                    </h1>
                    <p className="auctions-sub">Bid on exclusive items in real-time — every transaction is atomic.</p>
                </div>

                {/* Toolbar */}
                <div className="auctions-toolbar animate-fade-up stagger-1">
                    <div className="filter-tabs">
                        {FILTERS.map((f) => (
                            <button
                                key={f.id}
                                className={`filter-tab ${filter === f.id ? 'active' : ''}`}
                                onClick={() => setFilter(f.id)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                    <div className="live-count">
                        <span className="live-dot" />
                        {loading ? '...' : `${filtered.length} auctions live`}
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="auctions-grid">
                        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="empty-state animate-scale-in">
                        <div className="empty-state-icon">🔍</div>
                        <div className="empty-state-title">No auctions match this filter</div>
                        <p>Try a different category or check back soon.</p>
                    </div>
                ) : (
                    <div className="auctions-grid">
                        {filtered.map((auction, i) => (
                            <Link
                                to={`/auction/${auction.id}`}
                                key={auction.id}
                                className={`auction-card animate-fade-up stagger-${(i % 6) + 1}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                {/* Image */}
                                <div className="card-image">
                                    {auction.emoji}
                                    <div className="card-badge-overlay">
                                        <span className="badge badge-live">● LIVE</span>
                                        <span className="badge badge-violet">{auction.category}</span>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="card-body">
                                    <div className="card-title">{auction.title}</div>
                                    <div className="card-meta">
                                        <div className="card-bid-block">
                                            <div className="card-bid-label">Current Bid</div>
                                            <div className="card-bid-value">
                                                ${auction.currentBid.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="countdown">
                                            <div className="countdown-label">Time Left</div>
                                            <AuctionCountdown endTime={auction.endTime} />
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="card-footer">
                                    <span className="bid-count">
                                        🔨 {auction.bidCount} bids
                                    </span>
                                    <button className="btn btn-primary btn-sm" onClick={(e) => e.preventDefault()}>
                                        Bid Now
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuctionsPage;
