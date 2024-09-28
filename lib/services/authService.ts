import { account } from '../appwriteClient';
import { Teams } from 'appwrite';

interface User {
  $id: string;
  email: string;
  name: string;
  role?: string;
}

export async function login(email: string, password: string): Promise<User | null> {
  try {
    const session = await account.createEmailSession(email, password);
    const user = await account.get();
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

export async function getUserTeams(userId: string): Promise<string[]> {
  const teams = new Teams(account.client);
  const memberships = await teams.list();
  return memberships.teams.map(team => team.$id);
}

export async function oauthSignIn(provider: string): Promise<void> {
  try {
    // Note: OAuth sign-in might require a different approach in React Native
    console.warn('OAuth sign-in may require platform-specific implementation in React Native');
  } catch (error) {
    console.error(`${provider} sign in error`, error);
    throw error;
  }
}