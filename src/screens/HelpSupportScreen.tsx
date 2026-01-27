import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const HelpSupportScreen = () => {
    const navigation = useNavigation<any>();

    const FAQ = [
        { q: 'How does the AI personalization work?', a: 'Our AI analyzes your goals, interests, and current skill level to curate a unique learning path with relevant modules.' },
        { q: 'Can I change my career goal later?', a: 'Yes! You can update your career goal in the Profile section, and your AI coach will adapt the recommendations accordingly.' },
        { q: 'Is the certification industry-recognized?', a: 'Yes, our certificates are verified and can be shared on platforms like LinkedIn to showcase your skills.' },
    ];

    return (
        <ScreenWrapper useGradient>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={Theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help & Support</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.searchBox}>
                    <Ionicons name="search-outline" size={20} color={Theme.colors.gray} />
                    <TextInput
                        placeholder="Search for help..."
                        style={styles.searchInput}
                        placeholderTextColor={Theme.colors.gray}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Us</Text>
                    <View style={styles.contactRow}>
                        <TouchableOpacity style={styles.contactCard}>
                            <View style={[styles.iconBox, { backgroundColor: '#EEF2FF' }]}>
                                <Ionicons name="chatbubble-ellipses-outline" size={24} color={Theme.colors.primary} />
                            </View>
                            <Text style={styles.contactLabel}>Live Chat</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contactCard}>
                            <View style={[styles.iconBox, { backgroundColor: '#ECFDF5' }]}>
                                <Ionicons name="mail-outline" size={24} color={Theme.colors.secondary} />
                            </View>
                            <Text style={styles.contactLabel}>Email Support</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                    {FAQ.map((item, i) => (
                        <TouchableOpacity key={i} style={styles.faqItem}>
                            <View style={styles.faqHeader}>
                                <Text style={styles.faqQuestion}>{item.q}</Text>
                                <Ionicons name="chevron-down" size={18} color={Theme.colors.gray} />
                            </View>
                            <Text style={styles.faqAnswer}>{item.a}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.communityBtn}>
                    <View style={styles.communityLeft}>
                        <Ionicons name="people-outline" size={24} color={Theme.colors.white} />
                        <View>
                            <Text style={styles.communityTitle}>Join Community</Text>
                            <Text style={styles.communitySubtitle}>Discuss with 10k+ learners</Text>
                        </View>
                    </View>
                    <Ionicons name="arrow-forward" size={20} color={Theme.colors.white} />
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
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 15,
        color: Theme.colors.text,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Theme.colors.text,
        marginBottom: 16,
    },
    contactRow: {
        flexDirection: 'row',
        gap: 12,
    },
    contactCard: {
        flex: 1,
        backgroundColor: Theme.colors.surface,
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    contactLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Theme.colors.text,
    },
    faqItem: {
        backgroundColor: Theme.colors.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    faqQuestion: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
        color: Theme.colors.text,
        paddingRight: 10,
    },
    faqAnswer: {
        fontSize: 13,
        color: Theme.colors.textSecondary,
        lineHeight: 20,
    },
    communityBtn: {
        backgroundColor: Theme.colors.primary,
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    communityLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    communityTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Theme.colors.white,
    },
    communitySubtitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
    },
});

export default HelpSupportScreen;
