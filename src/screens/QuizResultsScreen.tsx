import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const QuizResultsScreen = ({ navigation }: any) => {
    return (
        <ScreenWrapper useGradient>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.successIconBox}>
                        <LinearGradient
                            colors={['#10B981', '#059669']}
                            style={styles.iconGradient}
                        >
                            <Ionicons name="trophy" size={60} color={Theme.colors.white} />
                        </LinearGradient>
                        <View style={styles.starBadge}>
                            <Ionicons name="star" size={20} color="#FBBF24" />
                        </View>
                    </View>

                    <Text style={styles.title}>Module Completed!</Text>
                    <Text style={styles.subtitle}>You've successfully mastered "Psychology of Design".</Text>

                    <View style={styles.scoreRow}>
                        <View style={styles.scoreCard}>
                            <Text style={styles.scoreValue}>80%</Text>
                            <Text style={styles.scoreLabel}>Score</Text>
                        </View>
                        <View style={styles.scoreCard}>
                            <Text style={styles.scoreValue}>4/5</Text>
                            <Text style={styles.scoreLabel}>Correct</Text>
                        </View>
                        <View style={styles.scoreCard}>
                            <Text style={[styles.scoreValue, { color: '#F59E0B' }]}>+150</Text>
                            <Text style={styles.scoreLabel}>XP Points</Text>
                        </View>
                    </View>

                    <View style={styles.breakdown}>
                        <Text style={styles.breakdownTitle}>Performance Summary</Text>
                        <View style={styles.summaryItem}>
                            <Ionicons name="time-outline" size={20} color={Theme.colors.textSecondary} />
                            <Text style={styles.summaryText}>Time taken: 04:52 mins</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Ionicons name="flash-outline" size={20} color={Theme.colors.textSecondary} />
                            <Text style={styles.summaryText}>Fastest answer: 12 seconds</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <CustomButton
                        title="View Certificate"
                        variant="outline"
                        onPress={() => navigation.navigate('Certificates')}
                        style={styles.outlineBtn}
                    />
                    <CustomButton
                        title="Back to Learning Path"
                        onPress={() => navigation.navigate('LearningPathDetail')}
                        style={styles.primaryBtn}
                    />
                </View>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        padding: Theme.spacing.xl,
    },
    successIconBox: {
        width: 120,
        height: 120,
        marginBottom: Theme.spacing.xl,
        position: 'relative',
    },
    iconGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    starBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: Theme.colors.white,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#10B981',
    },
    title: {
        fontSize: 28,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: Theme.spacing['2xl'], // FIXED: Changed .2xl to ['2xl']
        paddingHorizontal: 20,
    },
    scoreRow: {
        flexDirection: 'row',
        gap: Theme.spacing.md,
        marginBottom: Theme.spacing['2xl'], // FIXED: Changed .2xl to ['2xl']
    },
    scoreCard: {
        flex: 1,
        backgroundColor: Theme.colors.surface,
        borderRadius: 16,
        padding: Theme.spacing.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    scoreValue: {
        fontSize: 20,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.primary,
        marginBottom: 2,
    },
    scoreLabel: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
    },
    breakdown: {
        width: '100%',
        backgroundColor: Theme.colors.surface,
        padding: Theme.spacing.lg,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    breakdownTitle: {
        fontSize: 16,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.md,
    },
    summaryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: Theme.spacing.sm,
    },
    summaryText: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
    },
    footer: {
        padding: Theme.spacing.xl,
        paddingBottom: Platform.OS === 'ios' ? 34 : Theme.spacing.xl,
        gap: Theme.spacing.md,
    },
    primaryBtn: {
        marginVertical: 0,
        height: 56,
        borderRadius: 16,
    },
    outlineBtn: {
        marginVertical: 0,
        height: 56,
        borderRadius: 16,
    },
});

export default QuizResultsScreen;