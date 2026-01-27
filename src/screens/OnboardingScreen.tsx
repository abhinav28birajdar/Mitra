import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomButton from '../components/CustomButton';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'AI Career Guidance',
        description: 'Discover the perfect career path tailored to your unique skills and interests with our Gemini-powered engine.',
        icon: 'compass-outline',
        color: '#6366F1',
    },
    {
        id: '2',
        title: 'Smart Learning Paths',
        description: 'Follow dynamic learning modules generated specifically for you to bridge your skill gaps effectively.',
        icon: 'school-outline',
        color: '#10B981',
    },
    {
        id: '3',
        title: 'Interactive Assessments',
        description: 'Track your progress with real-time feedback and interactive quizzes on every step of your journey.',
        icon: 'analytics-outline',
        color: '#F59E0B',
    },
    {
        id: '4',
        title: 'Goal Oriented Success',
        description: 'Set professional goals, earn certifications, and land your dream job with Mitra by your side.',
        icon: 'trophy-outline',
        color: '#EC4899',
    },
];

const OnboardingScreen = () => {
    const navigation = useNavigation<any>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.replace('Welcome');
        }
    };

    const handleSkip = () => {
        navigation.replace('Welcome');
    };

    const renderItem = ({ item }: { item: typeof SLIDES[0] }) => {
        return (
            <View style={styles.slide}>
                <View style={[styles.imageContainer, { backgroundColor: item.color + '15' }]}>
                    <Ionicons name={item.icon as any} size={120} color={item.color} />
                    <View style={[styles.blob, { backgroundColor: item.color + '10' }]} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </View>
        );
    };

    return (
        <ScreenWrapper backgroundColor={Theme.colors.background}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>

            <Animated.FlatList
                ref={flatListRef}
                data={SLIDES}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
                keyExtractor={(item) => item.id}
            />

            <View style={styles.footer}>
                <View style={styles.pagination}>
                    {SLIDES.map((_, index) => {
                        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [8, 20, 8],
                            extrapolate: 'clamp',
                        });
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });
                        return (
                            <Animated.View
                                key={index}
                                style={[
                                    styles.dot,
                                    { width: dotWidth, opacity, backgroundColor: Theme.colors.primary }
                                ]}
                            />
                        );
                    })}
                </View>

                <CustomButton
                    title={currentIndex === SLIDES.length - 1 ? "Get Started" : "Continue"}
                    onPress={handleNext}
                    style={styles.button}
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: Theme.spacing.lg,
        paddingTop: Theme.spacing.md,
        alignItems: 'flex-end',
        zIndex: 10,
    },
    skipText: {
        color: Theme.colors.textSecondary,
        fontWeight: Theme.typography.fontWeight.semibold as any,
        fontSize: Theme.typography.fontSize.base,
    },
    slide: {
        width: width,
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.xl,
        justifyContent: 'center',
    },
    imageContainer: {
        width: width * 0.7,
        height: width * 0.7,
        borderRadius: width * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        position: 'relative',
    },
    blob: {
        position: 'absolute',
        width: '120%',
        height: '120%',
        borderRadius: width,
        zIndex: -1,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        textAlign: 'center',
        marginBottom: Theme.spacing.md,
    },
    description: {
        fontSize: Theme.typography.fontSize.base,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    footer: {
        paddingHorizontal: Theme.spacing.xl,
        paddingBottom: 50,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    button: {
        height: 60,
        borderRadius: 20,
    },
});

export default OnboardingScreen;
