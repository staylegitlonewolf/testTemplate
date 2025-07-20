'use client';

import { useState, useEffect } from 'react';
import { createWixClient, getCurrentUser, login, logout } from '@/lib/wix-client';

// WixAuth Platform - Production Ready Authentication System
export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    checkUser();
    // Add debug info
    setDebugInfo({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
      siteId: process.env.NEXT_PUBLIC_WIX_SITE_ID,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
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
    await login();
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  WixAuth
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-700">
                    Welcome, {user.profile?.firstName || user.profile?.email || 'User'}!
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Production Status */}
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 text-center">
        <p className="font-medium">🔐 WixAuth Platform - Secure Authentication Active</p>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                WixAuth
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Professional authentication platform with secure OAuth 2.0 integration. 
              Built with Next.js, TypeScript, and Tailwind CSS for enterprise-grade applications.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!user ? (
              <button
                onClick={handleLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Get Started - Sign In
              </button>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md">
                <h3 className="text-lg font-semibold text-green-800 mb-2">✅ Successfully Authenticated!</h3>
                <p className="text-green-700 text-sm">
                  You're now logged in with Wix authentication.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Production-ready authentication platform with enterprise security and modern web technologies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Authentication</h3>
              <p className="text-gray-600">
                OAuth 2.0 with PKCE authentication powered by Wix Studio Headless for enterprise-grade security.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Modern Stack</h3>
              <p className="text-gray-600">
                Built with Next.js 14, TypeScript, and Tailwind CSS for optimal performance and developer experience.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Production Ready</h3>
              <p className="text-gray-600">
                Deployed on GitHub Pages with automated CI/CD pipeline for seamless updates and maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Profile Section (if logged in) */}
      {user && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Name:</span>
                      <p className="text-gray-900">
                        {user.profile?.firstName} {user.profile?.lastName || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Email:</span>
                      <p className="text-gray-900">{user.profile?.email || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Member ID:</span>
                      <p className="text-gray-900 font-mono text-sm">{user.id}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-900">Active Member</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-900">OAuth Authenticated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Debug Information (Development) */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <details className="bg-white rounded-lg shadow p-6">
            <summary className="text-lg font-semibold text-gray-900 cursor-pointer">
              🔧 Debug Information (Development)
            </summary>
            <div className="mt-4 space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500">Client ID:</span>
                <p className="text-gray-900 font-mono text-sm">{debugInfo.clientId || 'Not set'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Site ID:</span>
                <p className="text-gray-900 font-mono text-sm">{debugInfo.siteId || 'Not set'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">User Agent:</span>
                <p className="text-gray-900 font-mono text-xs break-all">{debugInfo.userAgent}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Timestamp:</span>
                <p className="text-gray-900 font-mono text-sm">{debugInfo.timestamp}</p>
              </div>
            </div>
          </details>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">WixAuth Demo</h3>
          <p className="text-gray-400 mb-6">
            A demonstration of Wix Studio Headless authentication with modern web technologies.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>Next.js 14</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Wix SDK</span>
          </div>
        </div>
      </footer>
    </div>
  );
} 