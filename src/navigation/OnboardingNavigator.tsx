import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingStackParamList } from '@app-types/navigation.types';

// Import onboarding screens
import PersonalInfoScreen from '@screens/onboarding/PersonalInfoScreen';
import CareerInterestsScreen from '@screens/onboarding/CareerInterestsScreen';
import SkillsAssessmentScreen from '@screens/onboarding/SkillsAssessmentScreen';
import LearningPreferencesScreen from '@screens/onboarding/LearningPreferencesScreen';
import OnboardingCompleteScreen from '@screens/onboarding/OnboardingCompleteScreen';

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#FFFFFF' },
            }}
            initialRouteName="PersonalInfo"
        >
            <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
            <Stack.Screen name="CareerInterests" component={CareerInterestsScreen} />
            <Stack.Screen name="SkillsAssessment" component={SkillsAssessmentScreen} />
            <Stack.Screen name="LearningPreferences" component={LearningPreferencesScreen} />
            <Stack.Screen name="Complete" component={OnboardingCompleteScreen} />
        </Stack.Navigator>
    );
};

export default OnboardingNavigator;
