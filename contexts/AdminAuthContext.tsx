import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

interface AdminAuthContextType {
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    checkAdminAuth();
  }, []);

  async function checkAdminAuth() {
    try {
      const token = localStorage.getItem('admin_token');
      
      if (!token) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      // Verify token is still valid
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (error || !user) {
        localStorage.removeItem('admin_token');
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('admin_token');
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      // First, sign in to Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Store the session
        localStorage.setItem('admin_token', data.session?.access_token || '');
        setIsAdmin(true);
        return { success: true };
      }

      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  }

  async function logout() {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('admin_token');
      setIsAdmin(false);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <AdminAuthContext.Provider value={{ isAdmin, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
