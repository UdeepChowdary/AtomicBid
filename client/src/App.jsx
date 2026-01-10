import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuctionsPage from './pages/AuctionsPage';
import AuctionDetailPage from './pages/AuctionDetailPage';
import CreateAuctionPage from './pages/CreateAuctionPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <SocketProvider>
                <Router>
                    <div className="app">
                        <Navbar />
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/auctions" element={<AuctionsPage />} />
                                <Route path="/auction/:id" element={<AuctionDetailPage />} />
                                <Route path="/create-auction" element={<CreateAuctionPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/dashboard" element={<DashboardPage />} />
                            </Routes>
                        </main>
                    </div>
                </Router>
            </SocketProvider>
        </AuthProvider>
    );
}

export default App;
