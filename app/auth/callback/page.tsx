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
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      if (error) {
        setStatus(`Authentication error: ${error}`);
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
        return;
      }

      if (!code) {
        setStatus('No authorization code received');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
        return;
      }

      setStatus('Exchanging code for tokens...');

      const wixClient = createWixClient();
      const tokens = await wixClient.auth.processAuthCode(code);

      // Store tokens in cookies
      Cookies.set('session', JSON.stringify(tokens), { expires: 7 });

      setStatus('Authentication successful! Redirecting...');
      
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

    } catch (error) {
      console.error('Error processing callback:', error);
      setStatus('Authentication failed. Please try again.');
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