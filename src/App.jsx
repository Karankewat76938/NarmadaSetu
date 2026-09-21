import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import TouristLayout from './layouts/TouristLayout';
import PartnerLayout from './layouts/PartnerLayout';
import AdminLayout from './layouts/AdminLayout';

// Common Components
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import ServiceDetails from './pages/ServiceDetails';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PartnerApply from './pages/Auth/PartnerApply';

// Tourist Pages
import TouristDashboard from './pages/Tourist/TouristDashboard';
import MyBookings from './pages/Tourist/MyBookings';
import Profile from './pages/Tourist/Profile';

// Partner Pages
import PartnerDashboard from './pages/Partner/PartnerDashboard';
import ManageServices from './pages/Partner/ManageServices';
import PartnerBookings from './pages/Partner/PartnerBookings';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import PartnerApplications from './pages/Admin/PartnerApplications';
import ServiceModeration from './pages/Admin/ServiceModeration';
import UserManagement from './pages/Admin/UserManagement';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Marketplace Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/partner/apply"
              element={
                <ProtectedRoute allowedRoles={['tourist', 'partner', 'admin']}>
                  <PartnerApply />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Tourist Portal Routes */}
          <Route
            path="/tourist"
            element={
              <ProtectedRoute allowedRoles={['tourist', 'admin']}>
                <TouristLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/tourist/dashboard" replace />} />
            <Route path="dashboard" element={<TouristDashboard />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Partner Console Routes */}
          <Route
            path="/partner"
            element={
              <ProtectedRoute allowedRoles={['partner', 'admin']}>
                <PartnerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/partner/dashboard" replace />} />
            <Route path="dashboard" element={<PartnerDashboard />} />
            <Route path="services" element={<ManageServices />} />
            <Route path="bookings" element={<PartnerBookings />} />
          </Route>

          {/* Admin Hub Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="partners" element={<PartnerApplications />} />
            <Route path="services" element={<ServiceModeration />} />
            <Route path="users" element={<UserManagement />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

