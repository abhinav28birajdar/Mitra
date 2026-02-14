import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { communityService } from '@services/community/communityService';
import { Post } from '@app-types/firebase.types';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';

const CommunityFeedScreen: React.FC = () => {
    const { theme } = useTheme();
    const { user, profile } = useAuth();

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [newPostText, setNewPostText] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const data = await communityService.getFeed();
            setPosts(data as Post[]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handlePost = async () => {
        if (!newPostText.trim() || !user) return;
        setIsPosting(true);
        try {
            await communityService.createPost(
                user.uid,
                profile?.displayName || 'Anonymous',
                newPostText
            );
            setNewPostText('');
            fetchPosts();
        } catch (error) {
            console.error(error);
        } finally {
            setIsPosting(false);
        }
    };

    const handleLike = async (postId: string, currentLikes: string[]) => {
        if (!user) return;
        const isLiked = currentLikes.includes(user.uid);

        // Optimistic update
        setPosts(prev => prev.map(p => {
            if (p.id === postId) {
                return {
                    ...p,
                    likes: isLiked
                        ? p.likes.filter(id => id !== user.uid)
                        : [...p.likes, user.uid]
                };
            }
            return p;
        }));

        try {
            await communityService.toggleLike(postId, user.uid, isLiked);
        } catch (error) {
            console.error(error);
            fetchPosts(); // Rollback on error
        }
    };

    const renderPost = ({ item }: { item: Post }) => {
        const isLiked = user ? item.likes.includes(user.uid) : false;

        return (
            <View style={[styles.postCard, { backgroundColor: theme.colors.background.paper, borderColor: theme.colors.border.light }]}>
                <View style={styles.postHeader}>
                    <View style={[styles.avatar, { backgroundColor: theme.colors.primary[100] }]}>
                        <Text style={[styles.avatarText, { color: theme.colors.primary[600] }]}>
                            {item.authorName.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <View>
                        <Text style={[styles.authorName, { color: theme.colors.text.primary }]}>{item.authorName}</Text>
                        <Text style={[styles.postTime, { color: theme.colors.text.disabled }]}>
                            {new Date(item.createdAt?.seconds * 1000).toLocaleDateString()}
                        </Text>
                    </View>
                </View>

                <Text style={[styles.postContent, { color: theme.colors.text.primary }]}>{item.content}</Text>

                {item.mediaUrl ? (
                    <Image source={{ uri: item.mediaUrl }} style={styles.postMedia} />
                ) : null}

                <View style={styles.postFooter}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleLike(item.id, item.likes)}
                    >
                        <Icon
                            name={isLiked ? "heart" : "heart-outline"}
                            size={22}
                            color={isLiked ? theme.colors.error.main : theme.colors.text.secondary}
                        />
                        <Text style={[styles.actionText, { color: theme.colors.text.secondary }]}>{item.likes.length}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="chatbubble-outline" size={20} color={theme.colors.text.secondary} />
                        <Text style={[styles.actionText, { color: theme.colors.text.secondary }]}>{item.commentCount}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="share-social-outline" size={20} color={theme.colors.text.secondary} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <ScreenWrapper title="Community Feed">
            <View style={[styles.inputContainer, { backgroundColor: theme.colors.background.paper }]}>
                <TextInput
                    placeholder="Share your learning progress..."
                    placeholderTextColor={theme.colors.text.disabled}
                    multiline
                    style={[styles.input, { color: theme.colors.text.primary }]}
                    value={newPostText}
                    onChangeText={setNewPostText}
                />
                <View style={styles.inputFooter}>
                    <TouchableOpacity style={styles.mediaButton}>
                        <Icon name="image-outline" size={24} color={theme.colors.text.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.postButton, { backgroundColor: theme.colors.primary[600] }]}
                        onPress={handlePost}
                        disabled={isPosting || !newPostText.trim()}
                    >
                        {isPosting ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Text style={styles.postButtonText}>Post</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {loading ? (
                <View style={styles.centerSection}>
                    <ActivityIndicator size="large" color={theme.colors.primary[600]} />
                </View>
            ) : (
                <FlatList
                    data={posts}
                    renderItem={renderPost}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={fetchPosts} tintColor={theme.colors.primary[600]} />
                    }
                    ListEmptyComponent={
                        <View style={styles.centerSection}>
                            <Text style={{ color: theme.colors.text.disabled }}>No posts yet. Start the conversation!</Text>
                        </View>
                    }
                />
            )}
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    input: {
        fontSize: 16,
        minHeight: 60,
        textAlignVertical: 'top',
    },
    inputFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    mediaButton: {
        padding: 8,
    },
    postButton: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 20,
    },
    postButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 16,
        paddingBottom: 40,
    },
    postCard: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    authorName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postTime: {
        fontSize: 12,
    },
    postContent: {
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 12,
    },
    postMedia: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 12,
    },
    postFooter: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        paddingTop: 12,
        gap: 20,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '600',
    },
    centerSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    }
});

export default CommunityFeedScreen;
