import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth, AuthProvider } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

// App Screens
import LearningPathDetailScreen from '../screens/LearningPathDetailScreen';
import CareerDetailScreen from '../screens/CareerDetailScreen';
import ModuleLessonScreen from '../screens/ModuleLessonScreen';
import QuizAssessmentScreen from '../screens/QuizAssessmentScreen';
import QuizResultsScreen from '../screens/QuizResultsScreen';
import CertificatesScreen from '../screens/CertificatesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PrivacySettingsScreen from '../screens/PrivacySettingsScreen';
import SecuritySettingsScreen from '../screens/SecuritySettingsScreen';
import ThemeSettingsScreen from '../screens/ThemeSettingsScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import ChatListScreen from '../screens/ChatListScreen';
import CreateChatScreen from '../screens/CreateChatScreen';
import ImagePreviewScreen from '../screens/ImagePreviewScreen';
import UserActionsScreen from '../screens/UserActionsScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return null; // Or a loading screen
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!user ? (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            ) : (
                <Stack.Group>
                    <Stack.Screen name="Main" component={TabNavigator} />
                    <Stack.Screen name="LearningPathDetail" component={LearningPathDetailScreen} />
                    <Stack.Screen name="CareerDetail" component={CareerDetailScreen} />
                    <Stack.Screen name="ModuleLesson" component={ModuleLessonScreen} />
                    <Stack.Screen name="QuizAssessment" component={QuizAssessmentScreen} />
                    <Stack.Screen name="QuizResults" component={QuizResultsScreen} />
                    <Stack.Screen name="Certificates" component={CertificatesScreen} />

                    {/* Settings & Profile */}
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                    <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
                    <Stack.Screen name="SecuritySettings" component={SecuritySettingsScreen} />
                    <Stack.Screen name="ThemeSettings" component={ThemeSettingsScreen} />
                    <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
                    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                    <Stack.Screen name="UserProfile" component={UserProfileScreen} />

                    {/* Chat & Notifications */}
                    <Stack.Screen name="Notifications" component={NotificationsScreen} />
                    <Stack.Screen name="ChatList" component={ChatListScreen} />
                    <Stack.Screen name="CreateChat" component={CreateChatScreen} />

                    {/* Modals */}
                    <Stack.Group screenOptions={{ presentation: 'modal' }}>
                        <Stack.Screen name="ImagePreview" component={ImagePreviewScreen} />
                    </Stack.Group>
                    <Stack.Group screenOptions={{
                        presentation: 'transparentModal',
                    }}>
                        <Stack.Screen name="UserActions" component={UserActionsScreen} />
                    </Stack.Group>
                </Stack.Group>
            )}
        </Stack.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <AuthProvider>
                <MainNavigator />
            </AuthProvider>
        </NavigationContainer>
    );
};

export default AppNavigator;
