import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const ProfileSetupScreen = ({ navigation }: any) => {
    const [bio, setBio] = useState('');
    const [occupation, setOccupation] = useState('');
    const [location, setLocation] = useState('');

    return (
        <ScreenWrapper useGradient>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Complete your profile</Text>
                    <Text style={styles.subtitle}>Tell us a bit more about yourself to personalize your experience.</Text>
                </View>

                <View style={styles.photoSection}>
                    <View style={styles.photoContainer}>
                        <View style={styles.photoPlaceholder}>
                            <Ionicons name="person" size={50} color={Theme.colors.gray} />
                        </View>
                        <TouchableOpacity style={styles.editBadge}>
                            <Ionicons name="camera" size={20} color={Theme.colors.white} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.photoText}>Add profile photo</Text>
                </View>

                <View style={styles.form}>
                    <CustomInput
                        label="About You"
                        placeholder="I'm a passionate learner interested in..."
                        value={bio}
                        onChangeText={setBio}
                        multiline
                        numberOfLines={4}
                        containerStyle={styles.bioInput}
                    />

                    <CustomInput
                        label="Current Occupation"
                        placeholder="Student / UX Designer / etc."
                        value={occupation}
                        onChangeText={setOccupation}
                        iconName="briefcase-outline"
                    />

                    <CustomInput
                        label="Location"
                        placeholder="City, Country"
                        value={location}
                        onChangeText={setLocation}
                        iconName="location-outline"
                    />

                    <CustomButton
                        title="Finalize Setup"
                        onPress={() => navigation.navigate('AIPersonalization')}
                        style={styles.button}
                    />

                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={() => navigation.navigate('AIPersonalization')}
                    >
                        <Text style={styles.skipText}>Skip for now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        padding: Theme.spacing.lg,
    },
    header: {
        marginBottom: Theme.spacing.xl,
    },
    title: {
        fontSize: Theme.typography.fontSize['2xl'],
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.sm,
    },
    subtitle: {
        fontSize: Theme.typography.fontSize.base,
        color: Theme.colors.textSecondary,
    },
    photoSection: {
        alignItems: 'center',
        marginBottom: Theme.spacing.xl,
    },
    photoContainer: {
        width: 120,
        height: 120,
        position: 'relative',
        marginBottom: Theme.spacing.sm,
    },
    photoPlaceholder: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
        backgroundColor: Theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    editBadge: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: Theme.colors.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Theme.colors.white,
    },
    photoText: {
        fontSize: Theme.typography.fontSize.sm,
        fontWeight: Theme.typography.fontWeight.medium as any,
        color: Theme.colors.primary,
    },
    form: {
        marginTop: Theme.spacing.md,
    },
    bioInput: {
        height: 120,
    },
    button: {
        marginTop: Theme.spacing.lg,
    },
    skipButton: {
        alignItems: 'center',
        marginTop: Theme.spacing.md,
    },
    skipText: {
        fontSize: Theme.typography.fontSize.sm,
        color: Theme.colors.textSecondary,
        fontWeight: Theme.typography.fontWeight.medium as any,
    },
});

export default ProfileSetupScreen;
