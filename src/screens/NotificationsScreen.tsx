import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const NOTIFICATIONS = [
    {
        id: '1',
        type: 'achievement',
        title: 'New Achievement!',
        message: 'You earned the "Fast Learner" badge for completing 3 lessons in a day.',
        time: '2h ago',
        isRead: false,
        icon: 'trophy',
        color: '#F59E0B',
    },
    {
        id: '2',
        type: 'recommendation',
        title: 'AI Recommendation',
        message: 'Based on your recent progress, we suggest checking out "Advanced UX Research".',
        time: '5h ago',
        isRead: false,
        icon: 'sparkles',
        color: Theme.colors.primary,
    },
    {
        id: '3',
        type: 'social',
        title: 'New Connection',
        message: 'Sarah Miller started following your learning journey.',
        time: 'Yesterday',
        isRead: true,
        icon: 'person-add',
        color: Theme.colors.secondary,
    },
    {
        id: '4',
        type: 'system',
        title: 'Course Updated',
        message: 'The "React Native Masterclass" has new content available.',
        time: '2 days ago',
        isRead: true,
        icon: 'sync',
        color: Theme.colors.accent,
    },
];

const NotificationsScreen = () => {
    const navigation = useNavigation<any>();

    const renderItem = ({ item }: { item: typeof NOTIFICATIONS[0] }) => (
        <TouchableOpacity
            style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
            activeOpacity={0.7}
        >
            <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon as any} size={24} color={item.color} />
            </View>
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
            </View>
            {!item.isRead && <View style={styles.unreadDot} />}
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper useGradient>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={Theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <TouchableOpacity style={styles.markReadBtn}>
                    <Ionicons name="checkmark-done" size={24} color={Theme.colors.primary} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={NOTIFICATIONS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyIconCircle}>
                            <Ionicons name="notifications-off-outline" size={48} color={Theme.colors.gray} />
                        </View>
                        <Text style={styles.emptyTitle}>No notifications yet</Text>
                        <Text style={styles.emptySubtitle}>We'll notify you about achievements, course updates, and AI recommendations.</Text>
                    </View>
                )}
            />
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
        backgroundColor: 'rgba(255,255,255,0.8)',
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
    markReadBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: Theme.spacing.lg,
        gap: Theme.spacing.md,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: Theme.colors.surface,
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        alignItems: 'center',
    },
    unreadCard: {
        borderColor: Theme.colors.primary + '30',
        backgroundColor: '#F8FAFF',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Theme.colors.text,
    },
    time: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
    },
    message: {
        fontSize: 13,
        color: Theme.colors.textSecondary,
        lineHeight: 18,
    },
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Theme.colors.primary,
        marginLeft: 12,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
        paddingHorizontal: 40,
    },
    emptyIconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Theme.colors.text,
        marginBottom: 12,
    },
    emptySubtitle: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    },
});

export default NotificationsScreen;
