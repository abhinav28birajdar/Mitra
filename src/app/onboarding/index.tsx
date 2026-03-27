import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Smart Learning Paths',
    description: 'Follow dynamic learning modules generated specifically for you to bridge your skill gaps effectively.',
    icon: 'school-outline',
    iconColor: '#10B981', // Emerald green
    bgColor: '#ECFDF5',
  },
  {
    id: '2',
    title: 'AI Career Guidance',
    description: 'Discover the perfect career path tailored to your unique skills and interests with our Gemini-powered engine.',
    icon: 'compass-outline',
    iconColor: colors.primary, // Deep purple
    bgColor: colors.primaryLight,
  },
  {
    id: '3',
    title: 'Master New Skills',
    description: 'Engage with practical challenges and realistic projects curated to accelerate your personal mastery.',
    icon: 'bullseye-arrow',
    iconColor: '#3B82F6', // Blue
    bgColor: '#EFF6FF',
  },
  {
    id: '4',
    title: 'Goal Oriented Success',
    description: 'Set professional goals, earn certifications, and land your dream job with Mitra by your side.',
    icon: 'trophy-outline',
    iconColor: '#EC4899', // Pink matching screenshot
    bgColor: '#FDF2F8',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace('/auth' as any);
    }
  };

  const handleSkip = () => {
    router.replace('/auth' as any);
  };

  const renderSlide = ({ item }: { item: typeof SLIDES[0] }) => {
    return (
      <View style={styles.slideContainer}>
        
        {/* Icon Circle */}
        <View style={styles.iconWrapper}>
          <View style={[styles.iconCircleOuter, { backgroundColor: item.bgColor }]}>
             <MaterialCommunityIcons name={item.icon as any} size={84} color={item.iconColor} />
          </View>
        </View>

        {/* Text Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slider */}
      <View style={styles.sliderWrapper}>
        <FlatList
          data={SLIDES}
          renderItem={renderSlide}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          onMomentumScrollEnd={(ev) => {
            const index = Math.round(ev.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
          ref={slidesRef}
        />
      </View>

      {/* Footer Actions */}
      <View style={styles.footer}>
        {/* Paginator Dots */}
        <View style={styles.paginatorContainer}>
          {SLIDES.map((_, i) => {
            const isActive = currentIndex === i;
            return (
              <View
                key={i.toString()}
                style={[
                  styles.dot, 
                  isActive && styles.dotActive
                ]}
              />
            );
          })}
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleNext}>
          <Text style={styles.buttonText}>
             {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF', // Slightly tinted white
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    alignItems: 'flex-end',
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4B5563', // Slate grey
  },
  sliderWrapper: {
    flex: 1,
    paddingTop: spacing.xxl,
  },
  slideContainer: {
    width,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl * 1.5,
  },
  iconCircleOuter: {
    width: 280,
    height: 280,
    borderRadius: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  title: {
    ...typography.h2,
    fontSize: 28,
    textAlign: 'center',
    color: '#0F172A', // Dark navy
    marginBottom: spacing.md,
    lineHeight: 36,
  },
  description: {
    ...typography.body,
    fontSize: 15,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 24,
    paddingHorizontal: spacing.sm,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 50,
    alignItems: 'center',
  },
  paginatorContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E7FF',
    marginHorizontal: 4,
  },
  dotActive: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.white,
  },
});
