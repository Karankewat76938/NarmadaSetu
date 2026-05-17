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
import About from './pages/About';
import Contact from './pages/Contact';
import Partner from './pages/Partner';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

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
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
