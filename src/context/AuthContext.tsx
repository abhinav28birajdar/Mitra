import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile,
    GoogleAuthProvider,
    signInWithCredential,
} from 'firebase/auth';
import { auth, db } from '@lib/firebase';
import { Profile } from '@app-types/firebase.types';
import * as authService from '@services/auth/authService';
import { handleFirebaseError } from '@utils/errorHandler';

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
    signUp: (email: string, password: string, fullName: string) => Promise<void>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateUserProfile: (data: Partial<Profile>) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let profileUnsubscribe: (() => void) | null = null;

        const unsubscribe = authService.onAuthStateChange(async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser) {
                // Set up real-time profile listener
                profileUnsubscribe = authService.subscribeToProfile(firebaseUser.uid, (data) => {
                    setProfile(data);
                    setLoading(false);
                });
            } else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => {
            unsubscribe();
            if (profileUnsubscribe) profileUnsubscribe();
        };
    }, []);

    const signIn = async (email: string, password: string, rememberMe: boolean = true) => {
        try {
            await authService.signInWithEmail(email, password, rememberMe);
        } catch (error: any) {
            const appError = handleFirebaseError(error);
            throw new Error(appError.message);
        }
    };

    const signUp = async (email: string, password: string, fullName: string) => {
        try {
            await authService.signUpWithEmail(email, password, fullName);
        } catch (error: any) {
            const appError = handleFirebaseError(error);
            throw new Error(appError.message);
        }
    };

    const signOut = async () => {
        try {
            await authService.signOut();
        } catch (error: any) {
            const appError = handleFirebaseError(error);
            throw new Error(appError.message);
        }
    };

    const resetPassword = async (email: string) => {
        try {
            await authService.forgotPassword(email);
        } catch (error: any) {
            const appError = handleFirebaseError(error);
            throw new Error(appError.message);
        }
    };

    const updateUserProfile = async (data: Partial<Profile>) => {
        if (!user) throw new Error('No user logged in');

        try {
            const updatedProfile = await authService.updateFullProfile(user.uid, data);
            setProfile(updatedProfile);
        } catch (error: any) {
            const appError = handleFirebaseError(error);
            throw new Error(appError.message);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await authService.signInWithGoogle();
        } catch (error: any) {
            const appError = handleFirebaseError(error);
            throw new Error(appError.message);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                loading,
                signIn,
                signUp,
                signOut,
                resetPassword,
                updateUserProfile,
                signInWithGoogle,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
