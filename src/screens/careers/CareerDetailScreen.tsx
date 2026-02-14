import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Share
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '@app-types/navigation.types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@context/ThemeContext';
import { careerService } from '@services/career/careerService';
import { Career } from '@app-types/firebase.types';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';

type CareerDetailRouteProp = RouteProp<MainStackParamList, 'CareerDetail'>;

const CareerDetailScreen: React.FC = () => {
    const { theme } = useTheme();
    const route = useRoute<CareerDetailRouteProp>();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const { careerId } = route.params;

    const [career, setCareer] = useState<Career | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCareerDetails();
    }, [careerId]);

    const fetchCareerDetails = async () => {
        setLoading(true);
        try {
            const data = await careerService.getCareerById(careerId);
            setCareer(data as Career);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async () => {
        if (!career) return;
        try {
            await Share.share({
                message: `Check out this career path: ${career.title} on Mitra AI!`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <View style={[styles.center, { backgroundColor: theme.colors.background.light }]}>
                <ActivityIndicator size="large" color={theme.colors.primary[600]} />
            </View>
        );
    }

    if (!career) {
        return (
            <View style={[styles.center, { backgroundColor: theme.colors.background.light }]}>
                <Text style={{ color: theme.colors.text.primary }}>Career not found.</Text>
            </View>
        );
    }

    return (
        <ScreenWrapper
            title={career.title}
            showBackButton={true}
            headerRight={
                <TouchableOpacity onPress={handleShare}>
                    <Icon name="share-outline" size={24} color={theme.colors.text.primary} />
                </TouchableOpacity>
            }
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={[styles.heroCard, { backgroundColor: theme.colors.background.paper }]}>
                    <Text style={[styles.category, { color: theme.colors.primary[600] }]}>{career.category} • {career.level}</Text>
                    <Text style={[styles.title, { color: theme.colors.text.primary }]}>{career.title}</Text>

                    <View style={styles.statRow}>
                        <View style={styles.stat}>
                            <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>{career.growthRate}%</Text>
                            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>Growth</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.stat}>
                            <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>{career.demandLevel}</Text>
                            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>Demand</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.stat}>
                            <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>$$$</Text>
                            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>Pay</Text>
                        </View>
                    </View>
                </View>

                <Section title="Overview">
                    <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
                        {career.description}
                    </Text>
                </Section>

                <Section title="Required Skills">
                    <View style={styles.chipContainer}>
                        {career.skillsRequired.map((skill, index) => (
                            <View key={index} style={[styles.chip, { backgroundColor: theme.colors.primary[50], borderColor: theme.colors.primary[200] }]}>
                                <Text style={[styles.chipText, { color: theme.colors.primary[700] }]}>{skill}</Text>
                            </View>
                        ))}
                    </View>
                </Section>

                <Section title="Salary Insights">
                    <View style={[styles.infoCard, { backgroundColor: theme.colors.background.paper }]}>
                        <View style={styles.infoRow}>
                            <Text style={[styles.infoLabel, { color: theme.colors.text.secondary }]}>Entry Level</Text>
                            <Text style={[styles.infoValue, { color: theme.colors.text.primary }]}>
                                {career.salaryRange.min.toLocaleString()} {career.salaryRange.currency}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[styles.infoLabel, { color: theme.colors.text.secondary }]}>Average</Text>
                            <Text style={[styles.infoValue, { color: theme.colors.text.primary, fontWeight: 'bold' }]}>
                                {((career.salaryRange.min + career.salaryRange.max) / 2).toLocaleString()} {career.salaryRange.currency}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[styles.infoLabel, { color: theme.colors.text.secondary }]}>Senior Level</Text>
                            <Text style={[styles.infoValue, { color: theme.colors.text.primary }]}>
                                {career.salaryRange.max.toLocaleString()} {career.salaryRange.currency}
                            </Text>
                        </View>
                    </View>
                </Section>

                <Section title="Work Environment">
                    <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
                        {career.workEnvironment}
                    </Text>
                </Section>

                <TouchableOpacity
                    style={[styles.primaryButton, { backgroundColor: theme.colors.primary[600] }]}
                    onPress={() => navigation.navigate('CourseList', { category: career.category })}
                >
                    <Text style={styles.buttonText}>Find Courses for this Path</Text>
                    <Icon name="arrow-forward" size={20} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </ScreenWrapper>
    );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const { theme } = useTheme();
    return (
        <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>{title}</Text>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    heroCard: {
        padding: 24,
        borderRadius: 20,
        marginBottom: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    category: {
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
    stat: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 12,
    },
    divider: {
        width: 1,
        height: 30,
        backgroundColor: '#E5E7EB',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
    },
    chipText: {
        fontSize: 14,
        fontWeight: '600',
    },
    infoCard: {
        padding: 16,
        borderRadius: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    infoLabel: {
        fontSize: 14,
    },
    infoValue: {
        fontSize: 14,
    },
    primaryButton: {
        flexDirection: 'row',
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: 12,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CareerDetailScreen;
