import { createClient, OAuthStrategy } from '@wix/sdk';
import { members } from '@wix/members';
import Cookies from 'js-cookie';

// Create Wix client with OAuth authentication
export const createWixClient = () => {
  return createClient({
    modules: { members },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: JSON.parse(Cookies.get('session') || '{"accessToken": {}, "refreshToken": {}}'),
    }),
  });
};

// Get current user session
export const getCurrentUser = async () => {
  try {
    const wixClient = createWixClient();
    const currentMember = await wixClient.members.getCurrentMember();
    return currentMember;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Login function - Updated to use proper Wix-managed login flow
export const login = async () => {
  try {
    const wixClient = createWixClient();
    
    // Generate OAuth data for the login flow
    const oAuthData = wixClient.auth.generateOAuthData(
      `${window.location.origin}/auth/callback`, // Redirect URI
      window.location.href // Original URI
    );
    
    // Store OAuth data in localStorage for the callback
    localStorage.setItem('wixOAuthData', JSON.stringify(oAuthData));
    
    // Get the auth URL and redirect
    const { authUrl } = await wixClient.auth.getAuthUrl(oAuthData);
    window.location.href = authUrl;
  } catch (error) {
    console.error('Error during login:', error);
  }
};

// Logout function
export const logout = async () => {
  try {
    Cookies.remove('session');
    localStorage.removeItem('wixOAuthData'); // Clean up OAuth data
    window.location.href = '/';
  } catch (error) {
    console.error('Error during logout:', error);
  }
}; 