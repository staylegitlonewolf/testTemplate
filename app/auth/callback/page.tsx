'use client';

import { useEffect, useState } from 'react';
import { createWixClient } from '@/lib/wix-client';
import Cookies from 'js-cookie';

export default function AuthCallback() {
  const [status, setStatus] = useState('Processing authentication...');

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      const wixClient = createWixClient();
      
      // Parse the callback URL to get code, state, and any errors
      const returnedOAuthData = wixClient.auth.parseFromUrl();
      
      if (returnedOAuthData.error) {
        setStatus(`Authentication error: ${returnedOAuthData.errorDescription || returnedOAuthData.error}`);
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
        return;
      }

      if (!returnedOAuthData.code || !returnedOAuthData.state) {
        setStatus('No authorization code or state received');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
        return;
      }

      setStatus('Exchanging code for tokens...');

      // Retrieve the stored OAuth data from localStorage
      const storedOAuthData = localStorage.getItem('wixOAuthData');
      if (!storedOAuthData) {
        setStatus('OAuth data not found. Please try logging in again.');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
        return;
      }

      const oAuthData = JSON.parse(storedOAuthData);

      // Exchange the code for member tokens
      const tokens = await wixClient.auth.getMemberTokens(
        returnedOAuthData.code,
        returnedOAuthData.state,
        oAuthData
      );

      // Store tokens in cookies
      Cookies.set('session', JSON.stringify(tokens), { expires: 7 });
      
      // Clean up OAuth data from localStorage
      localStorage.removeItem('wixOAuthData');

      setStatus('Authentication successful! Redirecting...');
      
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

    } catch (error) {
      console.error('Error processing callback:', error);
      setStatus('Authentication failed. Please try again.');
      localStorage.removeItem('wixOAuthData'); // Clean up on error
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-lg text-gray-700">{status}</p>
      </div>
    </div>
  );
} 