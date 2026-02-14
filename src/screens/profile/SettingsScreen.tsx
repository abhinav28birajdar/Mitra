import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '@app-types/navigation.types';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import * as authService from '@services/auth/authService';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';

const SettingsScreen: React.FC = () => {
    const { theme, themeMode, setThemeMode } = useTheme();
    const { profile, signOut, updateUserProfile } = useAuth();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

    const handleSignOut = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Sign Out',
                    style: 'destructive',
                    onPress: async () => {
                        await signOut();
                    }
                }
            ]
        );
    };

    const SettingItem = ({ icon, title, value, onPress, type = 'link' }: any) => (
        <TouchableOpacity
            style={[styles.item, { borderBottomColor: theme.colors.border.light }]}
            onPress={onPress}
            disabled={type === 'switch'}
        >
            <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: theme.colors.background.light }]}>
                    <Icon name={icon} size={20} color={theme.colors.primary[600]} />
                </View>
                <Text style={[styles.itemTitle, { color: theme.colors.text.primary }]}>{title}</Text>
            </View>

            {type === 'link' && (
                <View style={styles.itemRight}>
                    {value && <Text style={[styles.itemValue, { color: theme.colors.text.secondary }]}>{value}</Text>}
                    <Icon name="chevron-forward" size={18} color={theme.colors.text.disabled} />
                </View>
            )}

            {type === 'switch' && (
                <Switch
                    value={value}
                    onValueChange={onPress}
                    trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary[300] }}
                    thumbColor={value ? theme.colors.primary[600] : theme.colors.gray[100]}
                />
            )}
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper title="Settings" showBackButton={true}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>Appearance</Text>
                <View style={[styles.section, { backgroundColor: theme.colors.background.paper }]}>
                    <SettingItem
                        icon="moon-outline"
                        title="Dark Mode"
                        value={themeMode === 'dark'}
                        type="switch"
                        onPress={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
                    />
                    <SettingItem
                        icon="color-palette-outline"
                        title="Use System Theme"
                        value={themeMode === 'auto'}
                        type="switch"
                        onPress={() => setThemeMode(themeMode === 'auto' ? 'light' : 'auto')}
                    />
                </View>

                <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>Preferences</Text>
                <View style={[styles.section, { backgroundColor: theme.colors.background.paper }]}>
                    <SettingItem
                        icon="notifications-outline"
                        title="Push Notifications"
                        value={profile?.preferences?.notifications}
                        type="switch"
                        onPress={(val: boolean) => updateUserProfile({ preferences: { ...profile?.preferences, notifications: val } as any })}
                    />
                    <SettingItem
                        icon="mail-outline"
                        title="Email Updates"
                        value={profile?.preferences?.emailUpdates}
                        type="switch"
                        onPress={(val: boolean) => updateUserProfile({ preferences: { ...profile?.preferences, emailUpdates: val } as any })}
                    />
                </View>

                <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>Account & Security</Text>
                <View style={[styles.section, { backgroundColor: theme.colors.background.paper }]}>
                    <SettingItem
                        icon="person-outline"
                        title="Edit Profile"
                        onPress={() => navigation.navigate('EditProfile')}
                    />
                    <SettingItem
                        icon="lock-closed-outline"
                        title="Change Password"
                        onPress={() => navigation.navigate('ChangePassword')}
                    />
                    <SettingItem
                        icon="shield-outline"
                        title="Privacy Settings"
                        onPress={() => Alert.alert('Privacy', 'Profile Visibility: Public')}
                    />
                    <SettingItem
                        icon="trash-outline"
                        title="Delete Account"
                        onPress={() => {
                            Alert.alert(
                                'Delete Account',
                                'This action is permanent and cannot be undone. All your data will be removed.',
                                [
                                    { text: 'Cancel', style: 'cancel' },
                                    {
                                        text: 'Delete Permanently',
                                        style: 'destructive',
                                        onPress: async () => {
                                            try {
                                                await authService.deleteAccount();
                                            } catch (error: any) {
                                                Alert.alert('Error', error.message);
                                            }
                                        }
                                    }
                                ]
                            );
                        }}
                    />
                </View>

                <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>Data & Cache</Text>
                <View style={[styles.section, { backgroundColor: theme.colors.background.paper }]}>
                    <SettingItem
                        icon="download-outline"
                        title="Export My Data"
                        onPress={() => Alert.alert('Export', 'A link to download your data will be sent to your email.')}
                    />
                    <SettingItem
                        icon="refresh-outline"
                        title="Clear Cache"
                        onPress={() => {
                            Alert.alert('Clear Cache', 'Are you sure?', [
                                { text: 'Cancel' },
                                { text: 'Clear', onPress: () => Alert.alert('Done', 'Cache cleared successfully.') }
                            ]);
                        }}
                    />
                </View>

                <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>Support & Info</Text>
                <View style={[styles.section, { backgroundColor: theme.colors.background.paper }]}>
                    <SettingItem
                        icon="help-circle-outline"
                        title="Help Center"
                        onPress={() => Alert.alert('Help Center', 'Our support team is available 24/7 at support@mitra.ai')}
                    />
                    <SettingItem
                        icon="document-text-outline"
                        title="Terms of Service"
                        onPress={() => Alert.alert('Terms', 'Coming soon.')}
                    />
                    <SettingItem
                        icon="shield-checkmark-outline"
                        title="Privacy Policy"
                        onPress={() => Alert.alert('Privacy Policy', 'Coming soon.')}
                    />
                    <SettingItem
                        icon="information-circle-outline"
                        title="About Mitra AI"
                        value="v1.0.0"
                        onPress={() => Alert.alert('About', 'Mitra AI v1.0.0\nBuilt with ❤️ by DeepMind')}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.signOutButton, { borderColor: theme.colors.error.main }]}
                    onPress={handleSignOut}
                >
                    <Icon name="log-out-outline" size={20} color={theme.colors.error.main} />
                    <Text style={[styles.signOutText, { color: theme.colors.error.main }]}>Sign Out</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 8,
        marginLeft: 4,
        letterSpacing: 0.5,
    },
    section: {
        borderRadius: 16,
        marginBottom: 24,
        overflow: 'hidden',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    itemValue: {
        fontSize: 14,
    },
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        gap: 10,
        marginTop: 10,
    },
    signOutText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default SettingsScreen;
