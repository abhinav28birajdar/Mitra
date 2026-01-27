import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_USER } from '../constants/mocks';
import CustomButton from '../components/CustomButton';

const EditProfileScreen = () => {
    const navigation = useNavigation<any>();
    const [name, setName] = useState(MOCK_USER.name);
    const [bio, setBio] = useState('Learning Career Strategy & Product Design');
    const [email, setEmail] = useState(MOCK_USER.email);
    const [location, setLocation] = useState('San Francisco, CA');

    const handleSave = () => {
        navigation.goBack();
    };

    return (
        <ScreenWrapper useGradient>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={24} color={Theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.avatarSection}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
                        <TouchableOpacity style={styles.changePicBtn}>
                            <Ionicons name="camera" size={20} color={Theme.colors.white} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.changePicLabel}>Change Profile Photo</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter your name"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Bio</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={bio}
                            onChangeText={setBio}
                            placeholder="Tell us about yourself"
                            multiline
                            numberOfLines={4}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={[styles.input, styles.disabledInput]}
                            value={email}
                            editable={false}
                        />
                        <Text style={styles.helperText}>Email cannot be changed.</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Location</Text>
                        <TextInput
                            style={styles.input}
                            value={location}
                            onChangeText={setLocation}
                            placeholder="City, Country"
                        />
                    </View>
                </View>

                <CustomButton
                    title="Update Profile"
                    onPress={handleSave}
                    style={styles.updateBtn}
                />
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.lg,
        paddingVertical: Theme.spacing.md,
        backgroundColor: Theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
    },
    saveText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },
    scrollContent: {
        padding: Theme.spacing.lg,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: Theme.spacing.xl,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: Theme.colors.white,
    },
    changePicBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Theme.colors.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Theme.colors.white,
    },
    changePicLabel: {
        fontSize: 14,
        color: Theme.colors.primary,
        fontWeight: 'bold',
    },
    form: {
        marginBottom: Theme.spacing.xl,
    },
    inputGroup: {
        marginBottom: Theme.spacing.lg,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Theme.colors.text,
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: Theme.colors.surface,
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        color: Theme.colors.text,
        borderWidth: 1.5,
        borderColor: Theme.colors.border,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    disabledInput: {
        backgroundColor: '#F8FAFC',
        color: Theme.colors.gray,
    },
    helperText: {
        fontSize: 11,
        color: Theme.colors.textSecondary,
        marginTop: 4,
        marginLeft: 4,
    },
    updateBtn: {
        height: 56,
        borderRadius: 16,
        marginBottom: 40,
    },
});

export default EditProfileScreen;
