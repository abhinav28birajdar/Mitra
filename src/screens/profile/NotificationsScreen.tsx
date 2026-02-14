
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import ScreenWrapper from '@components/ScreenWrapper';
import { fetchNotifications, markNotificationRead, AppNotification } from '@services/user/notificationService';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatDistanceToNow } from 'date-fns';

const NotificationsScreen: React.FC = () => {
    const { user } = useAuth();
    const { theme } = useTheme();

    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (user) {
            loadNotifications();
        }
    }, [user]);

    const loadNotifications = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const data = await fetchNotifications(user.uid, { limit: 20 });
            setNotifications(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleMarkAsRead = async (id: string) => {
        try {
            await markNotificationRead(id);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        } catch (error) {
            console.error(error);
        }
    };

    const renderNotificationItem = ({ item }: { item: AppNotification }) => {
        const timeAgo = item.created_at?.seconds
            ? formatDistanceToNow(new Date(item.created_at.seconds * 1000), { addSuffix: true })
            : 'Just now';

        return (
            <TouchableOpacity
                style={[
                    styles.card,
                    {
                        backgroundColor: item.is_read ? theme.colors.background.paper : theme.colors.primary[50],
                        borderColor: theme.colors.border.light
                    }
                ]}
                onPress={() => handleMarkAsRead(item.id)}
            >
                <View style={[styles.iconBox, { backgroundColor: theme.colors.primary[100] }]}>
                    <Icon name="notifications" size={20} color={theme.colors.primary[600]} />
                </View>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: theme.colors.text.primary, fontWeight: item.is_read ? '500' : 'bold' }]}>
                            {item.title}
                        </Text>
                        {!item.is_read && <View style={[styles.dot, { backgroundColor: theme.colors.primary[600] }]} />}
                    </View>
                    <Text style={[styles.body, { color: theme.colors.text.secondary }]}>{item.body}</Text>
                    <Text style={[styles.time, { color: theme.colors.text.disabled }]}>{timeAgo}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ScreenWrapper title="Notifications" showBackButton={true}>
            {loading && !refreshing ? (
                <View style={[styles.center, { backgroundColor: theme.colors.background.light }]}>
                    <ActivityIndicator size="large" color={theme.colors.primary[600]} />
                </View>
            ) : (
                <FlatList
                    data={notifications}
                    renderItem={renderNotificationItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    onRefresh={() => {
                        setRefreshing(true);
                        loadNotifications();
                    }}
                    refreshing={refreshing}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Icon name="notifications-off-outline" size={48} color={theme.colors.text.disabled} />
                            <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>No notifications yet.</Text>
                        </View>
                    }
                />
            )}
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        alignItems: 'flex-start',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 15,
        flex: 1,
        marginRight: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    body: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 6,
    },
    time: {
        fontSize: 12,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
    }
});

export default NotificationsScreen;
