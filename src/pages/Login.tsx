import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-[#0e1624]">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;