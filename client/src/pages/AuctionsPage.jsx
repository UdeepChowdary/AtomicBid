import { useState } from 'react';
import './AuctionsPage.css';

const AuctionsPage = () => {
    const [filter, setFilter] = useState('all');

    // Mock auction data - will be replaced with real API calls
    const mockAuctions = [
        {
            id: '1',
            title: 'Vintage Watch Collection',
            currentBid: 5000,
            endTime: new Date(Date.now() + 3600000),
            image: '⌚',
            bidCount: 24,
            status: 'active'
        },
        {
            id: '2',
            title: 'Rare Comic Book',
            currentBid: 2500,
            endTime: new Date(Date.now() + 7200000),
            image: '📚',
            bidCount: 18,
            status: 'active'
        },
        {
            id: '3',
            title: 'Antique Furniture Set',
            currentBid: 8000,
            endTime: new Date(Date.now() + 10800000),
            image: '🪑',
            bidCount: 35,
            status: 'active'
        },
    ];

    const formatTimeRemaining = (endTime) => {
        const diff = endTime - new Date();
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        return `${hours}h ${minutes}m`;
    };

    return (
        <div className="auctions-page">
            <div className="container">
                <div className="page-header">
                    <h1>Live Auctions</h1>
                    <p className="page-subtitle">Bid on exclusive items in real-time</p>
                </div>

                <div className="filters">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All Auctions
                    </button>
                    <button
                        className={`filter-btn ${filter === 'ending-soon' ? 'active' : ''}`}
                        onClick={() => setFilter('ending-soon')}
                    >
                        Ending Soon
                    </button>
                    <button
                        className={`filter-btn ${filter === 'new' ? 'active' : ''}`}
                        onClick={() => setFilter('new')}
                    >
                        New
                    </button>
                </div>

                <div className="auctions-grid">
                    {mockAuctions.map((auction) => (
                        <div key={auction.id} className="auction-card">
                            <div className="auction-image">{auction.image}</div>
                            <div className="auction-content">
                                <h3 className="auction-title">{auction.title}</h3>
                                <div className="auction-stats">
                                    <div className="stat">
                                        <span className="stat-label">Current Bid</span>
                                        <span className="stat-value">${auction.currentBid.toLocaleString()}</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-label">Time Left</span>
                                        <span className="stat-value">{formatTimeRemaining(auction.endTime)}</span>
                                    </div>
                                </div>
                                <div className="auction-footer">
                                    <span className="bid-count">{auction.bidCount} bids</span>
                                    <button className="btn btn-primary">Place Bid</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuctionsPage;
