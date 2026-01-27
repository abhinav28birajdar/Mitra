import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CERTIFICATES = [
    {
        id: '1',
        title: 'Mastering UX Psychology',
        date: 'Oct 12, 2025',
        issuer: 'Mitra Learning Lab',
        image: 'https://images.unsplash.com/photo-1606326666490-457574d4ef7c?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: '2',
        title: 'React Native Foundation',
        date: 'Sep 24, 2025',
        issuer: 'Mitra Learning Lab',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
    }
];

const CertificatesScreen = ({ navigation }: any) => {
    return (
        <ScreenWrapper useGradient>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={Theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Certificates</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.statsCard}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{CERTIFICATES.length}</Text>
                        <Text style={styles.statLabel}>Earned</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>3</Text>
                        <Text style={styles.statLabel}>In Progress</Text>
                    </View>
                </View>

                {CERTIFICATES.map((cert) => (
                    <TouchableOpacity key={cert.id} style={styles.certCard} activeOpacity={0.9}>
                        <Image source={{ uri: cert.image }} style={styles.certImage} />
                        <View style={styles.certInfo}>
                            <View style={styles.badgeRow}>
                                <View style={styles.verifiedBadge}>
                                    <Ionicons name="shield-checkmark" size={12} color={Theme.colors.white} />
                                    <Text style={styles.verifiedText}>VERIFIED</Text>
                                </View>
                                <Text style={styles.certDate}>{cert.date}</Text>
                            </View>
                            <Text style={styles.certTitle}>{cert.title}</Text>
                            <Text style={styles.certIssuer}>Issued by {cert.issuer}</Text>

                            <View style={styles.actionRow}>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <Ionicons name="download-outline" size={20} color={Theme.colors.primary} />
                                    <Text style={styles.actionText}>Download</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <Ionicons name="share-social-outline" size={20} color={Theme.colors.primary} />
                                    <Text style={styles.actionText}>Share</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                <View style={styles.emptyPrompt}>
                    <View style={styles.promptIcon}>
                        <Ionicons name="school-outline" size={32} color={Theme.colors.gray} />
                    </View>
                    <Text style={styles.promptTitle}>Keep Learning!</Text>
                    <Text style={styles.promptDesc}>
                        Complete your current path to unlock new official industry certifications.
                    </Text>
                </View>

                <View style={{ height: 100 }} />
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
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
    },
    scrollContent: {
        padding: Theme.spacing.lg,
    },
    statsCard: {
        flexDirection: 'row',
        backgroundColor: Theme.colors.surface,
        borderRadius: 16,
        padding: Theme.spacing.lg,
        marginBottom: Theme.spacing.xl,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.primary,
    },
    statLabel: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
        fontWeight: 'bold',
    },
    statDivider: {
        width: 1,
        height: '100%',
        backgroundColor: Theme.colors.border,
    },
    certCard: {
        backgroundColor: Theme.colors.surface,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: Theme.spacing.xl,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5,
    },
    certImage: {
        width: '100%',
        height: 180,
    },
    certInfo: {
        padding: Theme.spacing.lg,
    },
    badgeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.success,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    verifiedText: {
        color: Theme.colors.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
    certDate: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
    },
    certTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Theme.colors.text,
        marginBottom: 4,
    },
    certIssuer: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        marginBottom: Theme.spacing.lg,
    },
    actionRow: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        paddingTop: Theme.spacing.md,
        gap: Theme.spacing.xl,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    actionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },
    emptyPrompt: {
        alignItems: 'center',
        padding: Theme.spacing['2xl'], // FIXED: Changed .2xl to ['2xl']
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
        borderStyle: 'dashed',
    },
    promptIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Theme.spacing.md,
    },
    promptTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Theme.colors.text,
        marginBottom: 4,
    },
    promptDesc: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default CertificatesScreen;