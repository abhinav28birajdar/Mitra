import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const CHATS = [
    {
        id: 'mitra_ai',
        name: 'Mitra AI Coach',
        lastMessage: "I've analyzed your progress. Ready for Module 3?",
        time: '12:00 PM',
        unread: 1,
        image: 'ai',
        isAI: true,
    },
    {
        id: '2',
        name: 'Dr. Sarah Miller',
        lastMessage: "The case study looks great! One minor fix on slide 4.",
        time: '9:45 AM',
        unread: 0,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
        isAI: false,
    },
    {
        id: '3',
        name: 'Product Design Group',
        lastMessage: "Alex: Did anyone check the new Figma prototype?",
        time: 'Yesterday',
        unread: 5,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
        isAI: false,
        isGroup: true,
    },
];

const ChatListScreen = () => {
    const navigation = useNavigation<any>();
    const [search, setSearch] = useState('');

    const renderItem = ({ item }: { item: typeof CHATS[0] }) => (
        <TouchableOpacity
            style={styles.chatCard}
            onPress={() => item.id === 'mitra_ai' ? navigation.navigate('AI Chat') : navigation.navigate('ChatRoom', { chatId: item.id })}
        >
            <View style={styles.imageContainer}>
                {item.isAI ? (
                    <View style={styles.aiCircle}>
                        <Ionicons name="sparkles" size={24} color={Theme.colors.white} />
                    </View>
                ) : (
                    <Image source={{ uri: item.image }} style={styles.avatar} />
                )}
                <View style={styles.onlineDot} />
            </View>

            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <View style={styles.messageRow}>
                    <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
                    {item.unread > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadText}>{item.unread}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper useGradient>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Messages</Text>
                <TouchableOpacity style={styles.createBtn} onPress={() => navigation.navigate('CreateChat')}>
                    <Ionicons name="create-outline" size={24} color={Theme.colors.primary} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchSection}>
                <View style={styles.searchBar}>
                    <Ionicons name="search-outline" size={20} color={Theme.colors.gray} />
                    <TextInput
                        placeholder="Search conversations..."
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>

            <FlatList
                data={CHATS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
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
        backgroundColor: Theme.colors.surface,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Theme.colors.text,
    },
    createBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchSection: {
        padding: Theme.spacing.lg,
        backgroundColor: Theme.colors.surface,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.background,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 15,
        color: Theme.colors.text,
    },
    listContent: {
        padding: Theme.spacing.lg,
        gap: Theme.spacing.sm,
    },
    chatCard: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: Theme.colors.surface,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    imageContainer: {
        position: 'relative',
    },
    aiCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    onlineDot: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Theme.colors.success,
        borderWidth: 2,
        borderColor: Theme.colors.white,
    },
    content: {
        flex: 1,
        marginLeft: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Theme.colors.text,
    },
    time: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
        flex: 1,
        paddingRight: 8,
    },
    unreadBadge: {
        backgroundColor: Theme.colors.primary,
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    unreadText: {
        color: Theme.colors.white,
        fontSize: 11,
        fontWeight: 'bold',
    },
});

export default ChatListScreen;
