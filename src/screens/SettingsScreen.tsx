import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
    const navigation = useNavigation<any>();

    const renderSettingItem = (icon: any, title: string, subtitle: string, route?: string) => (
        <TouchableOpacity
            style={styles.settingItem}
            onPress={() => route && navigation.navigate(route)}
        >
            <View style={styles.iconBox}>
                <Ionicons name={icon} size={22} color={Theme.colors.primary} />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Theme.colors.gray} />
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper useGradient>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={Theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <View style={styles.card}>
                        {renderSettingItem('lock-closed-outline', 'Privacy', 'Manage your data and visibility', 'PrivacySettings')}
                        {renderSettingItem('shield-checkmark-outline', 'Security', 'Password and account safety', 'SecuritySettings')}
                        {renderSettingItem('notifications-outline', 'Notifications', 'Customize your alerts')}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>
                    <View style={styles.card}>
                        {renderSettingItem('color-palette-outline', 'Theme', 'Light, dark, or system mode', 'ThemeSettings')}
                        {renderSettingItem('language-outline', 'Language', 'Choose your preferred language')}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Support</Text>
                    <View style={styles.card}>
                        {renderSettingItem('help-circle-outline', 'Help & Support', 'FAQs and contact us', 'HelpSupport')}
                        {renderSettingItem('information-circle-outline', 'About', 'Version and legal info')}
                        {renderSettingItem('star-outline', 'Rate Us', 'Support the app')}
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutBtn}>
                    <Ionicons name="log-out" size={22} color={Theme.colors.error} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Theme.spacing.lg,
        paddingVertical: Theme.spacing.md,
        backgroundColor: Theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    backBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Theme.colors.text,
    },
    scrollContent: {
        padding: Theme.spacing.lg,
    },
    section: {
        marginBottom: Theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Theme.colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 12,
        marginLeft: 4,
    },
    card: {
        backgroundColor: Theme.colors.surface,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Theme.colors.text,
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 10,
        marginTop: 10,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Theme.colors.error,
    },
});

export default SettingsScreen;
