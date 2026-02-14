import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabParamList, MainStackParamList } from '@app-types/navigation.types';
import { useTheme } from '@context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

// Tab Screens
import HomeScreen from '@screens/home/HomeScreen';
import ExploreScreen from '@screens/explore/ExploreScreen';
import MyLearningScreen from '@screens/learning/MyLearningScreen';
import CommunityScreen from '@screens/community/CommunityScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';

// Detail Screens
import CourseListScreen from '@screens/courses/CourseListScreen';
import CourseDetailScreen from '@screens/courses/CourseDetailScreen';
import CareerListScreen from '@screens/careers/CareerListScreen';
import CareerDetailScreen from '@screens/careers/CareerDetailScreen';
import LessonViewerScreen from '@screens/lessons/LessonViewerScreen';
import AdvisorScreen from '@screens/ai/AdvisorScreen';
import EditProfileScreen from '@screens/profile/EditProfileScreen';
import SettingsScreen from '@screens/profile/SettingsScreen';
import GoalsScreen from '@screens/profile/GoalsScreen';
import AchievementsScreen from '@screens/profile/AchievementsScreen';
import NotificationsScreen from '@screens/profile/NotificationsScreen';
import ChangePasswordScreen from '@screens/profile/ChangePasswordScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<MainStackParamList>();

const TabNavigator: React.FC = () => {
    const { theme } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string;
                    switch (route.name) {
                        case 'Home': iconName = focused ? 'home' : 'home-outline'; break;
                        case 'Explore': iconName = focused ? 'compass' : 'compass-outline'; break;
                        case 'Learning': iconName = focused ? 'book' : 'book-outline'; break;
                        case 'Community': iconName = focused ? 'people' : 'people-outline'; break;
                        case 'Profile': iconName = focused ? 'person' : 'person-outline'; break;
                        default: iconName = 'help-outline';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.colors.primary[600],
                tabBarInactiveTintColor: theme.colors.gray[400],
                tabBarStyle: {
                    backgroundColor: theme.colors.background.paper,
                    borderTopColor: theme.colors.border.light,
                    borderTopWidth: 1,
                    height: 60,
                    paddingBottom: 8,
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Explore" component={ExploreScreen} />
            <Tab.Screen name="Learning" component={MyLearningScreen} />
            <Tab.Screen name="Community" component={CommunityScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const MainNavigator: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="CourseList" component={CourseListScreen} />
            <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
            <Stack.Screen name="CareerList" component={CareerListScreen} />
            <Stack.Screen name="CareerDetail" component={CareerDetailScreen} />
            <Stack.Screen name="LessonViewer" component={LessonViewerScreen} />
            <Stack.Screen name="AIAdvisor" component={AdvisorScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Goals" component={GoalsScreen} />
            <Stack.Screen name="Achievements" component={AchievementsScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            {/* Search, etc. */}
        </Stack.Navigator>
    );
};

export default MainNavigator;
