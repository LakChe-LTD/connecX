import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { logout as logoutAPI } from '@/api/auth/logout';

interface User {
  initials: string;
  id: string;
  name: string;
  email: string;
  role: 'user' | 'operator' | 'admin';
  firstName?: string;
  lastName?: string;
}

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  isLoggingOut: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        const parsedUser = JSON.parse(saved);
        // Handle both formats (from API and from localStorage)
        return {
          id: parsedUser._id || parsedUser.id,
          name: parsedUser.username || parsedUser.name,
          email: parsedUser.email,
          role: parsedUser.role,
          initials: parsedUser.initials || '',
          firstName: parsedUser.firstName,
          lastName: parsedUser.lastName,
        };
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
        return null;
      }
    }
    return null;
  });

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const logout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Call the logout API endpoint
      await logoutAPI();
      
      console.log('Logout successful');
    } catch (error: any) {
      console.error('Logout API error:', error);
      // Continue with local cleanup even if API call fails
    } finally {
      // Always clear local state regardless of API success/failure
      setUser(null);
      
      // Clear all auth-related data from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('sessionId');
      
      setIsLoggingOut(false);
      
      // Redirect to login page
      navigate('/signin');
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        setUser,
        isAuthenticated: !!user,
        logout,
        isLoggingOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}