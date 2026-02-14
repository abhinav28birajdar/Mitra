import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '@app-types/navigation.types';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen: React.FC = () => {
    const { theme } = useTheme();
    const { profile, signOut } = useAuth();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background.light }]}>
            <View style={styles.header}>
                <View style={styles.profileInfo}>
                    <View style={[styles.avatar, { backgroundColor: theme.colors.primary[600] }]}>
                        <Text style={styles.avatarText}>
                            {profile?.displayName?.charAt(0).toUpperCase() || 'U'}
                        </Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={[styles.name, { color: theme.colors.text.primary }]}>
                            {profile?.displayName || 'User'}
                        </Text>
                        <Text style={[styles.email, { color: theme.colors.text.secondary }]}>
                            {profile?.email}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <MenuItem
                    icon="person-outline"
                    title="Edit Profile"
                    onPress={() => navigation.navigate('EditProfile')}
                    theme={theme}
                />
                <MenuItem
                    icon="trophy-outline"
                    title="Achievements"
                    onPress={() => navigation.navigate('Achievements')}
                    theme={theme}
                />
                <MenuItem
                    icon="target-outline"
                    title="Goals"
                    onPress={() => navigation.navigate('Goals')}
                    theme={theme}
                />
                <MenuItem
                    icon="notifications-outline"
                    title="Notifications"
                    onPress={() => navigation.navigate('Notifications')}
                    theme={theme}
                />
                <MenuItem
                    icon="settings-outline"
                    title="Settings"
                    onPress={() => navigation.navigate('Settings')}
                    theme={theme}
                />
                <MenuItem
                    icon="help-circle-outline"
                    title="Help & Support"
                    onPress={() => { }}
                    theme={theme}
                />
                <MenuItem
                    icon="information-circle-outline"
                    title="About"
                    onPress={() => { }}
                    theme={theme}
                />
                <MenuItem
                    icon="log-out-outline"
                    title="Sign Out"
                    onPress={handleSignOut}
                    theme={theme}
                    isDestructive
                />
            </View>
        </ScrollView>
    );
};

const MenuItem: React.FC<{
    icon: string;
    title: string;
    onPress: () => void;
    theme: any;
    isDestructive?: boolean;
}> = ({ icon, title, onPress, theme, isDestructive }) => (
    <TouchableOpacity
        style={[styles.menuItem, { backgroundColor: theme.colors.background.paper }]}
        onPress={onPress}
    >
        <Icon
            name={icon}
            size={24}
            color={isDestructive ? theme.colors.error.main : theme.colors.text.primary}
        />
        <Text
            style={[
                styles.menuText,
                {
                    color: isDestructive ? theme.colors.error.main : theme.colors.text.primary,
                },
            ]}
        >
            {title}
        </Text>
        <Icon name="chevron-forward" size={20} color={theme.colors.text.disabled} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 32,
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    userInfo: {
        flex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
    },
    section: {
        paddingHorizontal: 24,
        gap: 8,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 16,
    },
});

export default ProfileScreen;
