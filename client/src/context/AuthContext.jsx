import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        // Configure axios defaults
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    useEffect(() => {
        // Check if user is logged in on mount
        const checkAuth = async () => {
            if (token) {
                try {
                    // TODO: Implement user verification endpoint
                    // const response = await axios.get('/api/auth/verify');
                    // setUser(response.data.user);
                } catch (error) {
                    console.error('Auth check failed:', error);
                    logout();
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, [token]);

    const login = async (email, password) => {
        try {
            // TODO: Implement login endpoint
            // const response = await axios.post('/api/auth/login', { email, password });
            // const { token, user } = response.data;
            // localStorage.setItem('token', token);
            // setToken(token);
            // setUser(user);
            // return { success: true };

            // Mock login for development
            const mockUser = { id: '1', email, name: 'Demo User' };
            const mockToken = 'mock-token-' + Date.now();
            localStorage.setItem('token', mockToken);
            setToken(mockToken);
            setUser(mockUser);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            // TODO: Implement register endpoint
            // const response = await axios.post('/api/auth/register', { name, email, password });
            // const { token, user } = response.data;
            // localStorage.setItem('token', token);
            // setToken(token);
            // setUser(user);
            // return { success: true };

            // Mock register for development
            const mockUser = { id: '1', email, name };
            const mockToken = 'mock-token-' + Date.now();
            localStorage.setItem('token', mockToken);
            setToken(mockToken);
            setUser(mockUser);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};
