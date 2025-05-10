
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to onboarding or home after 2.5 seconds
    const timer = setTimeout(() => {
      // Check if this is the first visit (in a real app, we'd check localStorage or some other persistence)
      const isFirstVisit = !localStorage.getItem('hasVisited');
      
      if (isFirstVisit) {
        localStorage.setItem('hasVisited', 'true');
        navigate('/onboarding');
      } else {
        navigate('/');
      }
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-700">
      <div className="text-center animate-pulse">
        <div className="inline-flex items-center mb-8">
          <Home className="h-16 w-16 text-white" />
          <span className="text-4xl font-bold text-white ml-4">Achei meu Lar</span>
        </div>
        <p className="text-white text-xl">Encontre o imóvel dos seus sonhos</p>
      </div>
    </div>
  );
};

export default SplashScreen;
