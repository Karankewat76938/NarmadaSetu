import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import ListingDetail from './pages/ListingDetail';
import ServiceListing from './pages/ServiceListing';
import BookingFlow from './pages/BookingFlow';
import AartiBooking from './pages/AartiBooking';
import Community from './pages/Community';
import SafetyDashboard from './pages/SafetyDashboard';
import Auth from './pages/Auth';
import TouristDashboard from './pages/TouristDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RiderDashboard from './pages/RiderDashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/services" element={<ServiceListing />} />
            <Route path="/community" element={<Community />} />
            <Route path="/safety" element={<SafetyDashboard />} />
            <Route path="/aarti" element={<AartiBooking />} />
            <Route path="/book" element={<BookingFlow />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/dashboard" element={<TouristDashboard />} />
            <Route path="/provider" element={<ProviderDashboard />} />
            <Route path="/rider" element={<RiderDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
