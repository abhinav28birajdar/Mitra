import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const ThemeSettingsScreen = () => {
    const navigation = useNavigation<any>();
    const [selectedTheme, setSelectedTheme] = useState('System');

    const THEMES = [
        { id: 'Light', icon: 'sunny-outline', color: '#F59E0B' },
        { id: 'Dark', icon: 'moon-outline', color: '#6366F1' },
        { id: 'System', icon: 'settings-outline', color: Theme.colors.gray },
    ];

    return (
        <ScreenWrapper useGradient>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={Theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Theme</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionDesc}>
                    Choose how Mitra looks on your device. "System" will automatically match your phone's settings.
                </Text>

                <View style={styles.themeList}>
                    {THEMES.map((theme) => {
                        const isSelected = selectedTheme === theme.id;
                        return (
                            <TouchableOpacity
                                key={theme.id}
                                style={[styles.themeCard, isSelected && styles.selectedCard]}
                                onPress={() => setSelectedTheme(theme.id)}
                            >
                                <View style={[styles.iconBox, { backgroundColor: theme.color + '15' }]}>
                                    <Ionicons name={theme.icon as any} size={24} color={theme.color} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.themeName}>{theme.id}</Text>
                                    <Text style={styles.themeDesc}>
                                        {theme.id === 'Light' ? 'Clean and crisp appearance' :
                                            theme.id === 'Dark' ? 'Easy on the eyes in low light' :
                                                'Sync with device settings'}
                                    </Text>
                                </View>
                                <View style={[styles.radio, isSelected && styles.radioActive]}>
                                    {isSelected && <View style={styles.radioInner} />}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.previewContainer}>
                    <Text style={styles.previewTitle}>Preview</Text>
                    <View style={[styles.previewBox, selectedTheme === 'Dark' && styles.previewDark]}>
                        <View style={[styles.previewHeader, selectedTheme === 'Dark' && { backgroundColor: '#1F2937' }]} />
                        <View style={styles.previewContent}>
                            <View style={[styles.previewLine, { width: '60%' }, selectedTheme === 'Dark' && { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
                            <View style={[styles.previewLine, { width: '80%' }, selectedTheme === 'Dark' && { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
                            <View style={[styles.previewCard, selectedTheme === 'Dark' && { backgroundColor: '#374151', borderColor: 'transparent' }]} />
                        </View>
                    </View>
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
    sectionDesc: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        lineHeight: 20,
        marginBottom: 24,
        paddingHorizontal: 4,
    },
    themeList: {
        gap: 12,
        marginBottom: 32,
    },
    themeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        padding: 16,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: Theme.colors.border,
    },
    selectedCard: {
        borderColor: Theme.colors.primary,
        backgroundColor: '#F5F7FF',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    themeName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Theme.colors.text,
        marginBottom: 2,
    },
    themeDesc: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Theme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioActive: {
        borderColor: Theme.colors.primary,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Theme.colors.primary,
    },
    previewContainer: {
        marginTop: 10,
    },
    previewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Theme.colors.text,
        marginBottom: 16,
    },
    previewBox: {
        width: '100%',
        height: 200,
        backgroundColor: Theme.colors.background,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        overflow: 'hidden',
    },
    previewDark: {
        backgroundColor: '#111827',
    },
    previewHeader: {
        height: 40,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    previewContent: {
        padding: 20,
        gap: 12,
    },
    previewLine: {
        height: 8,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 4,
    },
    previewCard: {
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        marginTop: 10,
    },
});

export default ThemeSettingsScreen;
