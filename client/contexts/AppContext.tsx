import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout as logoutAPI } from '@/api/auth/logout';

interface User {
  initials: string;
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'organization' | 'operator' | 'end-user';
  firstName?: string;
  lastName?: string;
  emailVerified?: boolean; // ✅ ADD THIS
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
    const token = localStorage.getItem('token');
    
    // ✅ CRITICAL: Must have both user data AND token
    if (saved && token) {
      try {
        const parsedUser = JSON.parse(saved);
        
        // ✅ CRITICAL: Check if email is verified
        if (parsedUser.emailVerified === false) {
          console.log('⚠️ User email not verified, clearing session');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('sessionId');
          return null;
        }
        
        // Handle both formats (from API and from localStorage)
        return {
          id: parsedUser._id || parsedUser.id,
          name: parsedUser.username || parsedUser.name || 
                `${parsedUser.firstName} ${parsedUser.lastName}`.trim(),
          email: parsedUser.email,
          role: parsedUser.role,
          initials: parsedUser.initials || 
                   (parsedUser.firstName && parsedUser.lastName 
                     ? `${parsedUser.firstName.charAt(0)}${parsedUser.lastName.charAt(0)}`.toUpperCase()
                     : parsedUser.firstName?.substring(0, 2).toUpperCase() || 'U'),
          firstName: parsedUser.firstName,
          lastName: parsedUser.lastName,
          emailVerified: parsedUser.emailVerified, // ✅ ADD THIS
        };
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('sessionId');
        return null;
      }
    }
    
    // ✅ If no token, clear everything
    if (!token) {
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('sessionId');
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
      // ✅ Only store user if email is verified
      if (user.emailVerified !== false) {
        localStorage.setItem('user', JSON.stringify(user));
      }
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
      
      // Redirect handled by route guards
      window.location.href = '/signin';
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        setUser,
        isAuthenticated: !!user && !!localStorage.getItem('token'), // ✅ CHECK BOTH
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