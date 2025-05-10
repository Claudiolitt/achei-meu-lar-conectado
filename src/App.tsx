import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import PropertyRegistration from './pages/PropertyRegistration';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import Subscriptions from './pages/Subscriptions';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import Partnerships from './pages/Partnerships';
import ListingHighlight from './pages/ListingHighlight';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/property-registration" element={<PropertyRegistration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/favorites" element={<Favorites />} />
          
          {/* New monetization routes */}
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/payment/:planId" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/partnerships" element={<Partnerships />} />
          <Route path="/listing-highlight" element={<ListingHighlight />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
