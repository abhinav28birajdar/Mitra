
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ActivityIndicator
} from 'react-native';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import ScreenWrapper from '@components/ScreenWrapper';
import { fetchUserAchievements, UserAchievement } from '@services/gamification/gamificationService';
import Icon from 'react-native-vector-icons/Ionicons';

const AchievementsScreen: React.FC = () => {
    const { user } = useAuth();
    const { theme } = useTheme();

    const [achievements, setAchievements] = useState<UserAchievement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadAchievements();
        }
    }, [user]);

    const loadAchievements = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const data = await fetchUserAchievements(user.uid);
            setAchievements(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderAchievementItem = ({ item }: { item: UserAchievement }) => (
        <View style={[styles.card, { backgroundColor: theme.colors.background.paper }]}>
            <View style={[styles.iconBox, { backgroundColor: item.achievement?.badgeColor || theme.colors.primary[100] }]}>
                <Icon name="trophy" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.cardContent}>
                <Text style={[styles.title, { color: theme.colors.text.primary }]}>{item.achievement?.title || 'Unknown Achievement'}</Text>
                <Text style={[styles.date, { color: theme.colors.text.secondary }]}>
                    Earned on {new Date(item.earnedAt?.seconds * 1000).toLocaleDateString()}
                </Text>
                {item.achievement?.description && (
                    <Text style={[styles.desc, { color: theme.colors.text.secondary }]}>{item.achievement.description}</Text>
                )}
            </View>
            <View style={styles.xpBadge}>
                <Text style={[styles.xpText, { color: theme.colors.primary[600] }]}>+{item.achievement?.xpReward || 0} XP</Text>
            </View>
        </View>
    );

    return (
        <ScreenWrapper title="Achievements" showBackButton={true}>
            {loading ? (
                <View style={[styles.center, { backgroundColor: theme.colors.background.light }]}>
                    <ActivityIndicator size="large" color={theme.colors.primary[600]} />
                </View>
            ) : (
                <FlatList
                    data={achievements}
                    renderItem={renderAchievementItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Icon name="trophy-outline" size={48} color={theme.colors.text.disabled} />
                            <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>No achievements yet. Keep learning!</Text>
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
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000', // simple shadow
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    date: {
        fontSize: 12,
        marginBottom: 4,
    },
    desc: {
        fontSize: 13,
    },
    xpBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#EEF2FF',
        borderRadius: 8,
    },
    xpText: {
        fontSize: 12,
        fontWeight: 'bold',
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

export default AchievementsScreen;
