import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const UserProfileScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { userId } = route.params || { userId: '2' };

    // Mock other user data
    const user = {
        name: 'Sarah Miller',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
        bio: 'Senior Product Designer @Meta. Passionate about AI and accessibility.',
        level: 42,
        points: 8450,
        followers: 1240,
        following: 580,
    };

    return (
        <ScreenWrapper useGradient>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.topHeader}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color={Theme.colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionBtn}>
                        <Ionicons name="ellipsis-horizontal" size={24} color={Theme.colors.white} />
                    </TouchableOpacity>
                </View>

                <LinearGradient
                    colors={[Theme.colors.primary, '#4F46E5']}
                    style={styles.headerBackground}
                >
                    <View style={styles.profileInfo}>
                        <View style={styles.avatarWrapper}>
                            <Image source={{ uri: user.avatar }} style={styles.avatar} />
                            <View style={styles.onlineBadge} />
                        </View>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.bio}>{user.bio}</Text>

                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{user.followers}</Text>
                                <Text style={styles.statLabel}>Followers</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{user.level}</Text>
                                <Text style={styles.statLabel}>Level</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{user.following}</Text>
                                <Text style={styles.statLabel}>Following</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                <View style={styles.actionSection}>
                    <TouchableOpacity style={styles.followBtn}>
                        <Ionicons name="person-add" size={20} color={Theme.colors.white} />
                        <Text style={styles.followText}>Follow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.messageBtn}>
                        <Ionicons name="chatbubble-ellipses" size={20} color={Theme.colors.primary} />
                        <Text style={styles.messageText}>Message</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentSection}>
                    <Text style={styles.sectionTitle}>Learning Progress</Text>
                    <View style={styles.progressCard}>
                        <View style={styles.progressHeader}>
                            <Ionicons name="school" size={20} color={Theme.colors.primary} />
                            <Text style={styles.progressTitle}>Advanced UX Psychology</Text>
                            <Text style={styles.progressPercent}>85%</Text>
                        </View>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: '85%' }]} />
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Recent Achievements</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.achievementsScroll}>
                        {[1, 2, 3, 4].map((i) => (
                            <View key={i} style={styles.badgeItem}>
                                <View style={styles.badgeIcon}>
                                    <Ionicons name="trophy" size={24} color="#F59E0B" />
                                </View>
                                <Text style={styles.badgeText}>Goal Master</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    topHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Theme.spacing.lg,
        paddingTop: 50,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerBackground: {
        paddingTop: 100,
        paddingBottom: 40,
        paddingHorizontal: Theme.spacing.xl,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    profileInfo: {
        alignItems: 'center',
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    onlineBadge: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: Theme.colors.success,
        borderWidth: 3,
        borderColor: Theme.colors.primary,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Theme.colors.white,
        marginBottom: 8,
    },
    bio: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 16,
        borderRadius: 20,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Theme.colors.white,
    },
    statLabel: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 2,
    },
    divider: {
        width: 1,
        height: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    actionSection: {
        flexDirection: 'row',
        paddingHorizontal: Theme.spacing.xl,
        gap: Theme.spacing.md,
        marginTop: -28,
    },
    followBtn: {
        flex: 1,
        height: 56,
        backgroundColor: Theme.colors.primary,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    followText: {
        color: Theme.colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    messageBtn: {
        width: 56,
        height: 56,
        backgroundColor: Theme.colors.surface,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    messageText: {
        display: 'none',
    },
    contentSection: {
        padding: Theme.spacing.xl,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Theme.colors.text,
        marginBottom: 16,
    },
    progressCard: {
        backgroundColor: Theme.colors.surface,
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        marginBottom: 24,
    },
    progressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressTitle: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: Theme.colors.text,
        marginLeft: 10,
    },
    progressPercent: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: '#F1F5F9',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Theme.colors.primary,
    },
    achievementsScroll: {
        gap: Theme.spacing.md,
        paddingBottom: 40,
    },
    badgeItem: {
        width: 100,
        alignItems: 'center',
    },
    badgeIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFFBEB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#FEF3C7',
    },
    badgeText: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
        fontWeight: '500',
    },
});

export default UserProfileScreen;
