# AtomicBid - Live Auction Platform

A real-time bidding platform with atomic transaction handling to prevent race conditions in high-pressure bidding scenarios.

## Features

- ⚡ Real-time bidding with Socket.io
- 🔒 Race-condition-safe atomic updates
- ⏱️ Server-synchronized countdown timers
- 🤖 Auto-bidding system
- 💳 Stripe payment integration (optional)
- 📱 Responsive design

## Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB with atomic operations
- Socket.io for real-time communication
- JWT authentication
- node-schedule for auction automation

**Frontend:**
- React 18
- Vite
- Socket.io-client
- React Router

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd AtomicBid
```

2. Install all dependencies
```bash
npm run install-all
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start development servers
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend on http://localhost:5173

## Project Structure

```
AtomicBid/
├── client/          # React frontend
├── server/          # Express backend
├── .env.example     # Environment variables template
└── package.json     # Root package.json with dev scripts
```

## Development

- `npm run dev` - Start both client and server
- `npm run server` - Start only backend
- `npm run client` - Start only frontend

## License

ISC
