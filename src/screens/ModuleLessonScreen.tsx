import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const ModuleLessonScreen = ({ navigation, route }: any) => {
    const { moduleId } = route.params || { moduleId: 1 };
    const [lessonProgress, setLessonProgress] = useState(0.4);

    return (
        <ScreenWrapper useGradient>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
                        <Ionicons name="close" size={24} color={Theme.colors.text} />
                    </TouchableOpacity>
                    <View style={styles.progressHost}>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: `${lessonProgress * 100}%` }]} />
                        </View>
                        <Text style={styles.progressLabel}>Lesson 2 of 5</Text>
                    </View>
                    <TouchableOpacity style={styles.optionBtn}>
                        <Ionicons name="ellipsis-horizontal" size={24} color={Theme.colors.text} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.videoPlaceholder}>
                        <LinearGradient
                            colors={['#1F2937', '#111827']}
                            style={styles.videoGradient}
                        >
                            <Ionicons name="play" size={64} color={Theme.colors.white} />
                            <Text style={styles.videoDuration}>08:45</Text>
                        </LinearGradient>
                    </View>

                    <View style={styles.lessonInfo}>
                        <Text style={styles.lessonTag}>MODULE {moduleId}</Text>
                        <Text style={styles.lessonTitle}>The Psychology of Modern Interface Design</Text>

                        <View style={styles.authorRow}>
                            <View style={styles.avatarMini} />
                            <Text style={styles.authorName}>Dr. Sarah Miller</Text>
                            <Text style={styles.authorTitle}>Product Psychologist at Meta</Text>
                        </View>
                    </View>

                    <View style={styles.contentSection}>
                        <Text style={styles.sectionHeading}>Summary</Text>
                        <Text style={styles.paragraph}>
                            In this lesson, we explore how human cognition impacts user interaction.
                            Understanding "Cognitive Load" is essential for creating interfaces that
                            feel intuitive rather than overwhelming.
                        </Text>

                        <View style={styles.keyTakeaway}>
                            <Ionicons name="bulb" size={24} color={Theme.colors.accent} />
                            <View style={styles.takeawayTextContainer}>
                                <Text style={styles.takeawayTitle}>Key Concept: Hick's Law</Text>
                                <Text style={styles.takeawayDesc}>
                                    The time it takes for a person to make a decision as a result of the
                                    possible choices: increasing the number of choices will increase the
                                    decision time logarithmically.
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.sectionHeading}>Related Resources</Text>
                        <TouchableOpacity style={styles.resourceCard}>
                            <Ionicons name="document-text-outline" size={24} color={Theme.colors.primary} />
                            <Text style={styles.resourceTitle}>Cognitive Psychology PDF</Text>
                            <Ionicons name="download-outline" size={20} color={Theme.colors.gray} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.resourceCard}>
                            <Ionicons name="link-outline" size={24} color={Theme.colors.primary} />
                            <Text style={styles.resourceTitle}>Nielsen Norman Group Article</Text>
                            <Ionicons name="open-outline" size={20} color={Theme.colors.gray} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.navBtn} onPress={() => { }}>
                        <Ionicons name="chevron-back" size={20} color={Theme.colors.primary} />
                        <Text style={styles.navTextPrimary}>Previous</Text>
                    </TouchableOpacity>

                    <CustomButton
                        title="Start Quiz"
                        onPress={() => navigation.navigate('QuizAssessment')}
                        style={styles.quizBtn}
                    />

                    <TouchableOpacity style={styles.navBtn} onPress={() => { }}>
                        <Text style={styles.navTextPrimary}>Next</Text>
                        <Ionicons name="chevron-forward" size={20} color={Theme.colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.lg,
        paddingVertical: Theme.spacing.md,
        backgroundColor: Theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    closeBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressHost: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.lg,
    },
    progressBar: {
        width: '100%',
        height: 4,
        backgroundColor: '#F1F5F9',
        borderRadius: 2,
        marginBottom: 4,
    },
    progressFill: {
        height: '100%',
        backgroundColor: Theme.colors.primary,
        borderRadius: 2,
    },
    progressLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Theme.colors.textSecondary,
    },
    optionBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    videoPlaceholder: {
        width: width,
        height: width * (9 / 16),
        backgroundColor: '#000',
    },
    videoGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    videoDuration: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: Theme.colors.white,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 'bold',
    },
    lessonInfo: {
        padding: Theme.spacing.lg,
        backgroundColor: Theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    lessonTag: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Theme.colors.primary,
        letterSpacing: 1,
        marginBottom: 8,
    },
    lessonTitle: {
        fontSize: 22,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.lg,
    },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    avatarMini: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#CBD5E1',
    },
    authorName: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Theme.colors.text,
    },
    authorTitle: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
    },
    contentSection: {
        padding: Theme.spacing.lg,
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.md,
    },
    paragraph: {
        fontSize: 15,
        color: Theme.colors.textSecondary,
        lineHeight: 24,
        marginBottom: Theme.spacing.xl,
    },
    keyTakeaway: {
        flexDirection: 'row',
        backgroundColor: '#FFFBEB',
        padding: Theme.spacing.lg,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#FEF3C7',
        gap: 12,
        marginBottom: Theme.spacing.xl,
    },
    takeawayTextContainer: {
        flex: 1,
    },
    takeawayTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#92400E',
        marginBottom: 4,
    },
    takeawayDesc: {
        fontSize: 13,
        color: '#B45309',
        lineHeight: 18,
    },
    resourceCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        marginBottom: Theme.spacing.sm,
        gap: 12,
    },
    resourceTitle: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: Theme.colors.text,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Theme.colors.surface,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Theme.spacing.lg,
        paddingVertical: 12,
        paddingBottom: Platform.OS === 'ios' ? 34 : 12,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,
    },
    navBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        padding: 8,
    },
    navTextPrimary: {
        color: Theme.colors.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    quizBtn: {
        flex: 1,
        marginHorizontal: Theme.spacing.lg,
        marginVertical: 0,
        height: 48,
        borderRadius: 12,
    },
});

export default ModuleLessonScreen;
