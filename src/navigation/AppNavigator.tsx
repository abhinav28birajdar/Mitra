import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '@context/AuthContext';
import AuthNavigator from './AuthNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import MainNavigator from './MainNavigator';
import { RootStackParamList } from '@app-types/navigation.types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    const { user, profile, loading } = useAuth();

    if (loading) {
        // TODO: Add proper loading screen
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!user ? (
                    <Stack.Screen name="Auth" component={AuthNavigator} />
                ) : !profile?.onboardingCompleted ? (
                    <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
                ) : (
                    <Stack.Screen name="Main" component={MainNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
