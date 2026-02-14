import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { storageService } from '@services/user/storageService';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen: React.FC = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const { user, profile, updateUserProfile } = useAuth();

    const [fullName, setFullName] = useState(profile?.fullName || '');
    const [displayName, setDisplayName] = useState(profile?.displayName || '');
    const [bio, setBio] = useState(profile?.bio || '');
    const [location, setLocation] = useState(profile?.location || '');
    const [avatarUri, setAvatarUri] = useState<string | null>(profile?.avatar || null);
    const [saving, setSaving] = useState(false);

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0].uri) {
            setAvatarUri(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        if (!fullName.trim() || !displayName.trim()) {
            Alert.alert('Error', 'Full name and display name are required.');
            return;
        }

        setSaving(true);
        try {
            let finalAvatarUrl = avatarUri;

            // If avatarUri is a local file (starts with file:// or content://), upload it
            if (avatarUri && (avatarUri.startsWith('file://') || avatarUri.startsWith('content://'))) {
                const path = `avatars/${user?.uid}_${Date.now()}.jpg`;
                finalAvatarUrl = await storageService.uploadImage(avatarUri, path);
            }

            await updateUserProfile({
                fullName,
                displayName,
                bio,
                location,
                avatar: finalAvatarUrl || undefined
            });
            Alert.alert('Success', 'Profile updated successfully!');
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <ScreenWrapper title="Edit Profile" showBackButton={true}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.avatarSection}>
                        <TouchableOpacity onPress={handlePickImage} style={styles.avatarContainer}>
                            {avatarUri ? (
                                <Image source={{ uri: avatarUri }} style={styles.avatar} />
                            ) : (
                                <View style={[styles.avatarPlaceholder, { backgroundColor: theme.colors.primary[100] }]}>
                                    <Icon name="person" size={50} color={theme.colors.primary[600]} />
                                </View>
                            )}
                            <View style={[styles.editIcon, { backgroundColor: theme.colors.primary[600] }]}>
                                <Icon name="camera" size={16} color="#FFFFFF" />
                            </View>
                        </TouchableOpacity>
                        <Text style={[styles.avatarLabel, { color: theme.colors.text.secondary }]}>Tap to change photo</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Full Name</Text>
                            <TextInput
                                style={[styles.input, { color: theme.colors.text.primary, borderColor: theme.colors.border.light, backgroundColor: theme.colors.background.paper }]}
                                value={fullName}
                                onChangeText={setFullName}
                                placeholder="Your full name"
                                placeholderTextColor={theme.colors.text.disabled}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Display Name</Text>
                            <TextInput
                                style={[styles.input, { color: theme.colors.text.primary, borderColor: theme.colors.border.light, backgroundColor: theme.colors.background.paper }]}
                                value={displayName}
                                onChangeText={setDisplayName}
                                placeholder="How you'll appear to others"
                                placeholderTextColor={theme.colors.text.disabled}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Bio</Text>
                            <TextInput
                                style={[styles.input, styles.textArea, { color: theme.colors.text.primary, borderColor: theme.colors.border.light, backgroundColor: theme.colors.background.paper }]}
                                value={bio}
                                onChangeText={setBio}
                                placeholder="Tell us a bit about yourself"
                                placeholderTextColor={theme.colors.text.disabled}
                                multiline
                                numberOfLines={4}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Location</Text>
                            <TextInput
                                style={[styles.input, { color: theme.colors.text.primary, borderColor: theme.colors.border.light, backgroundColor: theme.colors.background.paper }]}
                                value={location}
                                onChangeText={setLocation}
                                placeholder="City, Country"
                                placeholderTextColor={theme.colors.text.disabled}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.saveButton, { backgroundColor: theme.colors.primary[600] }]}
                        onPress={handleSave}
                        disabled={saving}
                    >
                        {saving ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        )}
                    </TouchableOpacity>

                    <View style={{ height: 40 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        width: 110,
        height: 110,
        borderRadius: 55,
        position: 'relative',
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
    },
    avatarPlaceholder: {
        width: 110,
        height: 110,
        borderRadius: 55,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    avatarLabel: {
        marginTop: 12,
        fontSize: 14,
    },
    form: {
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        height: 54,
        borderRadius: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        paddingTop: 12,
        textAlignVertical: 'top',
    },
    saveButton: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default EditProfileScreen;
