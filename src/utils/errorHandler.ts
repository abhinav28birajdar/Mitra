
import { FirebaseError } from 'firebase/app';

export enum ErrorCode {
    AUTH_INVALID_EMAIL = 'auth/invalid-email',
    AUTH_USER_NOT_FOUND = 'auth/user-not-found',
    AUTH_WRONG_PASSWORD = 'auth/wrong-password',
    AUTH_EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
    NETWORK_REQUEST_FAILED = 'auth/network-request-failed',
    PERMISSION_DENIED = 'permission-denied',
    NOT_FOUND = 'not-found',
    UNKNOWN = 'unknown',
}

interface AppError {
    code: string;
    message: string;
    originalError?: any;
}

export const handleFirebaseError = (error: any): AppError => {
    console.error('[Firebase Error]:', error);

    if (error instanceof FirebaseError) {
        switch (error.code) {
            case 'auth/invalid-email':
                return { code: ErrorCode.AUTH_INVALID_EMAIL, message: 'Invalid email address.' };
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                return { code: ErrorCode.AUTH_WRONG_PASSWORD, message: 'Incorrect email or password.' };
            case 'auth/email-already-in-use':
                return { code: ErrorCode.AUTH_EMAIL_ALREADY_IN_USE, message: 'This email is already registered.' };
            case 'auth/network-request-failed':
                return { code: ErrorCode.NETWORK_REQUEST_FAILED, message: 'Network error. Please check your connection.' };
            default:
                return { code: error.code, message: error.message };
        }
    }

    return {
        code: ErrorCode.UNKNOWN,
        message: 'An unexpected error occurred. Please try again.',
        originalError: error,
    };
};

export const logError = (context: string, error: any) => {
    console.error(`[Error Context: ${context}]:`, error);
    // In real production, you'd send this to Sentry or Crashlytics
};
