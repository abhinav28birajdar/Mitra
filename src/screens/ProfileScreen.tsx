import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch, Platform } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_USER } from '../constants/mocks';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const { logout } = useAuth();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const renderSettingItem = (icon: any, title: string, color: string, onPress?: () => void, rightElement?: React.ReactNode) => (
        <TouchableOpacity
            style={styles.settingItem}
            activeOpacity={0.7}
            onPress={onPress}
            disabled={!onPress && !rightElement}
        >
            <View style={styles.settingLeft}>
                <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
                    <Ionicons name={icon} size={20} color={color} />
                </View>
                <Text style={styles.settingTitle}>{title}</Text>
            </View>
            {rightElement || <Ionicons name="chevron-forward" size={18} color={Theme.colors.gray} />}
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper useGradient>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditProfile')}>
                        <Ionicons name="create-outline" size={22} color={Theme.colors.primary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
                        <View style={styles.premiumBadge}>
                            <Ionicons name="shield-checkmark" size={14} color={Theme.colors.white} />
                        </View>
                    </View>
                    <Text style={styles.nameText}>{MOCK_USER.name}</Text>
                    <Text style={styles.bioText}>Learning Career Strategy & Product Design</Text>

                    <View style={styles.levelRow}>
                        <LinearGradient
                            colors={['#F59E0B', '#FBBF24']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.xpBadge}
                        >
                            <Text style={styles.xpText}>Lvl {MOCK_USER.level}</Text>
                        </LinearGradient>
                        <View style={styles.xpProgressContainer}>
                            <View style={styles.xpProgressBar}>
                                <View style={[styles.xpProgressFill, { width: '65%' }]} />
                            </View>
                            <Text style={styles.xpSubtext}>1,450 / 2,000 XP</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{MOCK_USER.points}</Text>
                        <Text style={styles.statLabel}>Points</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Badges</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>8</Text>
                        <Text style={styles.statLabel}>Certificates</Text>
                    </View>
                </View>

                <View style={[styles.section, { marginTop: Theme.spacing['xl'] }]}>
                    <Text style={styles.sectionTitle}>Account Settings</Text>
                    <View style={styles.sectionCard}>
                        {renderSettingItem('person-outline', 'Personal Information', Theme.colors.primary, () => navigation.navigate('EditProfile'))}
                        {renderSettingItem('notifications-outline', 'Notification Preferences', Theme.colors.secondary)}
                        {renderSettingItem('shield-checkmark-outline', 'Privacy & Security', Theme.colors.accent, () => navigation.navigate('PrivacySettings'))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>
                    <View style={styles.sectionCard}>
                        {renderSettingItem(
                            'moon-outline',
                            'Dark Mode',
                            Theme.colors.text,
                            undefined,
                            <Switch
                                value={isDarkMode}
                                onValueChange={setIsDarkMode}
                                trackColor={{ false: '#E2E8F0', true: Theme.colors.primary }}
                                thumbColor={Platform.OS === 'android' ? '#fff' : undefined}
                            />
                        )}
                        {renderSettingItem('language-outline', 'App Language', Theme.colors.text)}
                        {renderSettingItem('cloud-upload-outline', 'Data Sync', Theme.colors.text)}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Support & More</Text>
                    <View style={styles.sectionCard}>
                        {renderSettingItem('settings-outline', 'App Settings', Theme.colors.gray, () => navigation.navigate('Settings'))}
                        {renderSettingItem('help-circle-outline', 'Help Center', Theme.colors.success, () => navigation.navigate('HelpSupport'))}
                        {renderSettingItem('star-outline', 'Rate the App', '#F59E0B')}
                        {renderSettingItem('log-out-outline', 'Log Out', Theme.colors.error, logout)}
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.versionText}>Mitra v1.0.0-build.2025</Text>
                    <Text style={styles.footerNote}>© 2025 Mitra AI Learning. All rights reserved.</Text>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        padding: Theme.spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Theme.spacing.xl,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
    },
    editBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: Theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: Theme.spacing['2xl'],
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: Theme.spacing.md,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: Theme.colors.white,
    },
    premiumBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Theme.colors.primary,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Theme.colors.white,
    },
    nameText: {
        fontSize: 24,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: 4,
    },
    bioText: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        marginBottom: Theme.spacing.md,
    },
    levelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        width: '100%',
    },
    xpBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        marginRight: Theme.spacing.md,
    },
    xpText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Theme.colors.white,
    },
    xpProgressContainer: {
        flex: 1,
    },
    xpProgressBar: {
        height: 6,
        backgroundColor: '#F1F5F9',
        borderRadius: 3,
        marginBottom: 4,
    },
    xpProgressFill: {
        height: '100%',
        backgroundColor: '#F59E0B',
        borderRadius: 3,
    },
    xpSubtext: {
        fontSize: 10,
        color: Theme.colors.textSecondary,
        fontWeight: 'bold',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: Theme.spacing.lg,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    statBox: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 20,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
        fontWeight: '500',
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: Theme.colors.border,
    },
    section: {
        marginBottom: Theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.md,
        paddingLeft: 4,
    },
    sectionCard: {
        backgroundColor: Theme.colors.surface,
        borderRadius: 20,
        paddingHorizontal: Theme.spacing.md,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F8FAFC',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Theme.spacing.md,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingTitle: {
        fontSize: 15,
        fontWeight: Theme.typography.fontWeight.medium as any,
        color: Theme.colors.text,
    },
    footer: {
        alignItems: 'center',
        marginTop: Theme.spacing.xl,
        gap: 4,
    },
    versionText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Theme.colors.textSecondary,
    },
    footerNote: {
        fontSize: 10,
        color: Theme.colors.gray,
    },
});

export default ProfileScreen;
