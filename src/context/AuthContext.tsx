import React, { createContext, useState, useContext, useEffect } from 'react';
import { MOCK_USER } from '../constants/mocks';

interface AuthContextType {
    user: any | null;
    isLoading: boolean;
    login: (email: string, pass: string) => Promise<boolean>;
    logout: () => void;
    register: (data: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: false,
    login: async () => false,
    logout: () => { },
    register: async () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Simulate persistent login check
    useEffect(() => {
        // Check storage in real app
    }, []);

    const login = async (email: string, pass: string) => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Check hardcoded credentials as per request
        if (email === 'abhinavbirajdar28@gmail.com' && pass === '12345678') {
            setUser(MOCK_USER);
            setIsLoading(false);
            return true;
        }

        setIsLoading(false);
        return false;
    };

    const register = async (data: any) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Mock registration success
        setUser({ ...MOCK_USER, ...data });
        setIsLoading(false);
        return true;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
