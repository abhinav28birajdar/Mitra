import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '@app-types/navigation.types';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';
import CustomInput from '@components/CustomInput';
import CustomButton from '@components/CustomButton';

type PersonalInfoScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'PersonalInfo'>;

interface Props {
    navigation: PersonalInfoScreenNavigationProp;
}

const PersonalInfoScreen: React.FC<Props> = ({ navigation }) => {
    const { theme } = useTheme();
    const { profile, updateUserProfile } = useAuth();

    const [bio, setBio] = useState(profile?.bio || '');
    const [location, setLocation] = useState(profile?.location || '');
    const [dateOfBirth, setDateOfBirth] = useState(profile?.dateOfBirth || '');
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        setLoading(true);
        try {
            await updateUserProfile({
                bio: bio.trim(),
                location: location.trim(),
                dateOfBirth: dateOfBirth.trim(),
            });
            navigation.navigate('CareerInterests');
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = () => {
        navigation.navigate('CareerInterests');
    };

    return (
        <ScreenWrapper>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <View style={[styles.progressBackground, { backgroundColor: theme.colors.background.light }]}>
                            <View style={[styles.progressBar, { backgroundColor: theme.colors.primary[600], width: '20%' }]} />
                        </View>
                        <Text style={[styles.stepText, { color: theme.colors.primary[600] }]}>
                            STEP 1 OF 5
                        </Text>
                        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                            Tell us about yourself
                        </Text>
                        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
                            Help us personalize your learning experience with basic details.
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <CustomInput
                            label="Bio (Optional)"
                            placeholder="Tell us a bit about yourself..."
                            value={bio}
                            onChangeText={setBio}
                            multiline
                            numberOfLines={4}
                            iconName="information-circle-outline"
                        />

                        <CustomInput
                            label="Location (Optional)"
                            placeholder="City, Country"
                            value={location}
                            onChangeText={setLocation}
                            iconName="location-outline"
                        />

                        <CustomInput
                            label="Date of Birth (Optional)"
                            placeholder="YYYY-MM-DD"
                            value={dateOfBirth}
                            onChangeText={setDateOfBirth}
                            iconName="calendar-outline"
                        />
                    </View>
                </ScrollView>

                <View style={[styles.footer, { backgroundColor: theme.colors.background.paper, borderTopColor: theme.colors.border.light }]}>
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={handleSkip}
                    >
                        <Text style={[styles.skipText, { color: theme.colors.text.secondary }]}>
                            Skip for now
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: '60%' }}>
                        <CustomButton
                            title="Continue"
                            onPress={handleContinue}
                            isLoading={loading}
                            icon={<Icon name="arrow-forward" size={20} color="#FFFFFF" />}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 100,
    },
    header: {
        marginBottom: 32,
    },
    progressBackground: {
        height: 6,
        borderRadius: 3,
        marginBottom: 20,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
    },
    stepText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
        letterSpacing: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
    },
    form: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderTopWidth: 1,
    },
    skipButton: {
        paddingVertical: 12,
    },
    skipText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default PersonalInfoScreen;
