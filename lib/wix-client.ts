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

// Login function
export const login = async () => {
  try {
    const wixClient = createWixClient();
    const loginUrl = await wixClient.members.createLoginUrl({
      redirectUrl: `${window.location.origin}/auth/callback`,
    });
    window.location.href = loginUrl;
  } catch (error) {
    console.error('Error during login:', error);
  }
};

// Logout function
export const logout = async () => {
  try {
    const wixClient = createWixClient();
    await wixClient.members.logout();
    Cookies.remove('session');
    window.location.href = '/';
  } catch (error) {
    console.error('Error during logout:', error);
  }
}; 