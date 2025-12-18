// 'use client';

// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { authApi } from '../lib/auth';
// import { api } from '../lib/api';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is logged in on initial load
//     const checkAuth = async () => {
//       try {
//         const accessToken = localStorage.getItem('accessToken');
        
//         if (accessToken) {
//           // Set the token in the API client
//           api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          
//           // Get user profile
//           const response = await authApi.getProfile();
//           setUser(response.data.user);
//         }
//       } catch (error) {
//         // Token is invalid, remove it
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await authApi.login({ email, password });
      
//       // Store tokens
//       localStorage.setItem('accessToken', response.data.accessToken);
//       localStorage.setItem('refreshToken', response.data.refreshToken);
      
//       // Set the token in the API client
//       api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      
//       // Set user
//       setUser(response.data.user);
//     } catch (error: any) {
//       // Handle login error
//       throw new Error(error.response?.data?.message || 'Login failed');
//     }
//   };

//   const register = async (name: string, email: string, password: string) => {
//     try {
//       const response = await authApi.register({ name, email, password });
      
//       // Store tokens
//       localStorage.setItem('accessToken', response.data.accessToken);
//       localStorage.setItem('refreshToken', response.data.refreshToken);
      
//       // Set the token in the API client
//       api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      
//       // Set user
//       setUser(response.data.user);
//     } catch (error: any) {
//       // Handle registration error
//       throw new Error(error.response?.data?.message || 'Registration failed');
//     }
//   };

//   const logout = async () => {
//     try {
//       const refreshToken = localStorage.getItem('refreshToken');
      
//       if (refreshToken) {
//         // Call logout endpoint with refresh token
//         await authApi.logout({ refreshToken });
//       }
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       // Remove tokens
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('refreshToken');
      
//       // Remove token from API client
//       delete api.defaults.headers.common['Authorization'];
      
//       // Clear user
//       setUser(null);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }