
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import Onboarding from './pages/Onboarding';
import Index from './pages/Index';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import PropertyRegistration from './pages/PropertyRegistration';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import { AuthProvider } from './providers/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import Subscriptions from './pages/Subscriptions';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import Partnerships from './pages/Partnerships';
import ListingHighlight from './pages/ListingHighlight';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RealEstateNews from './pages/RealEstateNews';
import MortgageCalculator from './pages/MortgageCalculator';
import Notifications from './pages/Notifications';
import Chat from './pages/Chat';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Initial Flow */}
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* Main Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/property-registration" element={<PropertyRegistration />} />
          
          {/* User Account */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/chat" element={<Chat />} />
          
          {/* Monetization */}
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/payment/:planId" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/partnerships" element={<Partnerships />} />
          <Route path="/listing-highlight" element={<ListingHighlight />} />
          
          {/* Information Pages */}
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/news" element={<RealEstateNews />} />
          <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
