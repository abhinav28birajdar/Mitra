import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const PrivacySettingsScreen = () => {
    const navigation = useNavigation<any>();
    const [options, setOptions] = useState({
        publicProfile: true,
        showProgress: true,
        activityStatus: false,
        analytics: true,
    });

    const toggleOption = (key: keyof typeof options) => {
        setOptions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <ScreenWrapper useGradient>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={Theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.section}>
                    <Text style={styles.sectionDesc}>
                        Manage how your data is shared and who can see your activity on Mitra.
                    </Text>

                    <View style={styles.card}>
                        <View style={styles.row}>
                            <View style={styles.textCol}>
                                <Text style={styles.label}>Public Profile</Text>
                                <Text style={styles.desc}>Allow others to see your badges and rank.</Text>
                            </View>
                            <Switch
                                value={options.publicProfile}
                                onValueChange={() => toggleOption('publicProfile')}
                                trackColor={{ false: '#E2E8F0', true: Theme.colors.primary }}
                            />
                        </View>

                        <View style={styles.row}>
                            <View style={styles.textCol}>
                                <Text style={styles.label}>Show Progress</Text>
                                <Text style={styles.desc}>Display your current courses on your profile.</Text>
                            </View>
                            <Switch
                                value={options.showProgress}
                                onValueChange={() => toggleOption('showProgress')}
                                trackColor={{ false: '#E2E8F0', true: Theme.colors.primary }}
                            />
                        </View>

                        <View style={styles.row}>
                            <View style={styles.textCol}>
                                <Text style={styles.label}>Activity Status</Text>
                                <Text style={styles.desc}>Show when you are active to your connections.</Text>
                            </View>
                            <Switch
                                value={options.activityStatus}
                                onValueChange={() => toggleOption('activityStatus')}
                                trackColor={{ false: '#E2E8F0', true: Theme.colors.primary }}
                            />
                        </View>

                        <View style={[styles.row, { borderBottomWidth: 0 }]}>
                            <View style={styles.textCol}>
                                <Text style={styles.label}>Usage Analytics</Text>
                                <Text style={styles.desc}>Help us improve Mitra by sharing anonymous data.</Text>
                            </View>
                            <Switch
                                value={options.analytics}
                                onValueChange={() => toggleOption('analytics')}
                                trackColor={{ false: '#E2E8F0', true: Theme.colors.primary }}
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.dangerBtn}>
                    <Text style={styles.dangerText}>Request My Data</Text>
                    <Ionicons name="download-outline" size={20} color={Theme.colors.primary} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.dangerBtn, { marginTop: 10 }]}>
                    <Text style={[styles.dangerText, { color: Theme.colors.error }]}>Delete Account</Text>
                    <Ionicons name="trash-outline" size={20} color={Theme.colors.error} />
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
    sectionDesc: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        lineHeight: 20,
        marginBottom: 24,
        paddingHorizontal: 4,
    },
    card: {
        backgroundColor: Theme.colors.surface,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    section: {
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    textCol: {
        flex: 1,
        paddingRight: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Theme.colors.text,
        marginBottom: 4,
    },
    desc: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
        lineHeight: 18,
    },
    dangerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Theme.colors.surface,
        padding: 16,
        borderRadius: 16,
        marginTop: 20,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    dangerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },
});

export default PrivacySettingsScreen;
