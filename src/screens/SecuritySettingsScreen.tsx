import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const SecuritySettingsScreen = () => {
    const navigation = useNavigation<any>();

    const renderActionItem = (title: string, subtitle: string, icon: any, color: string = Theme.colors.primary) => (
        <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.iconCircle, { backgroundColor: color + '15' }]}>
                <Ionicons name={icon} size={22} color={color} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.actionTitle}>{title}</Text>
                <Text style={styles.actionSubtitle}>{subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Theme.colors.gray} />
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper useGradient>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={Theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Security</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.securityScoreCard}>
                    <View style={styles.scoreInfo}>
                        <Text style={styles.scoreLabel}>Security Status</Text>
                        <Text style={styles.scoreValue}>Excellent</Text>
                        <Text style={styles.scoreDesc}>Your account is well-protected.</Text>
                    </View>
                    <View style={styles.scoreIcon}>
                        <Ionicons name="shield-checkmark" size={60} color={Theme.colors.success} />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Login Security</Text>
                    <View style={styles.card}>
                        {renderActionItem('Change Password', 'Update your login credentials', 'key-outline')}
                        {renderActionItem('Two-Factor Auth', 'Highly recommended for safety', 'lock-closed-outline', Theme.colors.secondary)}
                        {renderActionItem('Face ID / Bio', 'Enable quick secure login', 'finger-print-outline')}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Device Management</Text>
                    <View style={styles.card}>
                        {renderActionItem('Active Sessions', 'Manage logged in devices', 'phone-portrait-outline')}
                        {renderActionItem('Login Activity', 'Review recent login history', 'time-outline')}
                    </View>
                </View>

                <View style={styles.infoBox}>
                    <Ionicons name="information-circle" size={20} color={Theme.colors.info} />
                    <Text style={styles.infoText}>
                        We recommend updating your password every 6 months to maintain account integrity.
                    </Text>
                </View>
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
    securityScoreCard: {
        flexDirection: 'row',
        backgroundColor: Theme.colors.surface,
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.border,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    scoreInfo: {
        flex: 1,
    },
    scoreIcon: {
        marginLeft: 16,
    },
    scoreLabel: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    scoreValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Theme.colors.success,
        marginBottom: 4,
    },
    scoreDesc: {
        fontSize: 13,
        color: Theme.colors.textSecondary,
    },
    section: {
        marginBottom: 24,
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
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    actionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Theme.colors.text,
        marginBottom: 2,
    },
    actionSubtitle: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#E0F2FE',
        padding: 16,
        borderRadius: 16,
        gap: 12,
    },
    infoText: {
        flex: 1,
        fontSize: 12,
        color: '#0369A1',
        lineHeight: 18,
    },
});

export default SecuritySettingsScreen;
