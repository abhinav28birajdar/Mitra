import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OTPScreen from '../screens/OTPScreen';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import EmailVerificationScreen from '../screens/EmailVerificationScreen';

import ReferralSourceScreen from '../screens/ReferralSourceScreen';
import GoalSelectionScreen from '../screens/GoalSelectionScreen';
import SkillAssessmentScreen from '../screens/SkillAssessmentScreen';
import InterestSelectionScreen from '../screens/InterestSelectionScreen';
import LearningPreferenceScreen from '../screens/LearningPreferenceScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import AIPersonalizationLoadingScreen from '../screens/AIPersonalizationLoadingScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />

            {/* Setup Flow */}
            <Stack.Screen name="ReferralSource" component={ReferralSourceScreen} />
            <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
            <Stack.Screen name="SkillAssessment" component={SkillAssessmentScreen} />
            <Stack.Screen name="InterestSelection" component={InterestSelectionScreen} />
            <Stack.Screen name="LearningPreference" component={LearningPreferenceScreen} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
            <Stack.Screen name="AIPersonalization" component={AIPersonalizationLoadingScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
