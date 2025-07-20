'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, login, logout } from '@/lib/wix-client';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [debug, setDebug] = useState<any>({});

  useEffect(() => {
    checkUser();
    // Add debug information
    setDebug({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
      siteId: process.env.NEXT_PUBLIC_WIX_SITE_ID,
      origin: typeof window !== 'undefined' ? window.location.origin : 'server',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server'
    });
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    console.log('Login button clicked');
    await login();
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to Wix Studio Headless Auth Demo
        </h1>
        
        {/* Debug Information */}
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
          <h3 className="font-bold">Debug Info:</h3>
          <pre className="text-xs mt-2">
            {JSON.stringify(debug, null, 2)}
          </pre>
        </div>
        
        {user ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Welcome back, {user.profile?.firstName || user.profile?.email || 'User'}!
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">User Profile</h3>
              <div className="text-sm text-gray-600">
                <p><strong>Email:</strong> {user.profile?.email}</p>
                <p><strong>First Name:</strong> {user.profile?.firstName || 'Not provided'}</p>
                <p><strong>Last Name:</strong> {user.profile?.lastName || 'Not provided'}</p>
                <p><strong>Member ID:</strong> {user._id}</p>
                <p><strong>Status:</strong> {user.status}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Get Started with Authentication
            </h2>
            <p className="text-gray-600 mb-6">
              This demo shows how to implement OAuth authentication with Wix Studio Headless.
              Click the button below to sign in or create an account.
            </p>
            
            <button
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out text-lg"
            >
              Sign In / Sign Up
            </button>
            
            <div className="mt-8 text-sm text-gray-500">
              <p>This will redirect you to Wix for authentication.</p>
              <p>After authentication, you'll be redirected back to this page.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 