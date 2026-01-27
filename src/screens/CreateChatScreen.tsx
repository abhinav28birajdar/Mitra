import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const USERS = [
    { id: '1', name: 'Dr. Sarah Miller', role: 'UX Expert', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop' },
    { id: '2', name: 'Alex Rivera', role: 'Learner', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop' },
    { id: '3', name: 'Jessica Chen', role: 'Career Coach', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop' },
    { id: '4', name: 'Michael Brown', role: 'Fullstack Developer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop' },
];

const CreateChatScreen = () => {
    const navigation = useNavigation<any>();
    const [search, setSearch] = useState('');

    const renderItem = ({ item }: { item: typeof USERS[0] }) => (
        <TouchableOpacity
            style={styles.userCard}
            onPress={() => navigation.navigate('ChatRoom', { chatId: item.id, name: item.name })}
        >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.role}>{item.role}</Text>
            </View>
            <Ionicons name="chatbubble-outline" size={20} color={Theme.colors.primary} />
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper useGradient>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={24} color={Theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>New Chat</Text>
                <View style={{ width: 44 }} />
            </View>

            <View style={styles.searchSection}>
                <View style={styles.searchBar}>
                    <Ionicons name="search-outline" size={20} color={Theme.colors.gray} />
                    <TextInput
                        placeholder="Search people or groups..."
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>

            <View style={styles.quickActions}>
                <TouchableOpacity style={styles.actionBtn}>
                    <View style={[styles.iconBox, { backgroundColor: '#EEF2FF' }]}>
                        <Ionicons name="people-outline" size={22} color={Theme.colors.primary} />
                    </View>
                    <Text style={styles.actionText}>New Group</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                    <View style={[styles.iconBox, { backgroundColor: '#ECFDF5' }]}>
                        <Ionicons name="sparkles-outline" size={22} color={Theme.colors.secondary} />
                    </View>
                    <Text style={styles.actionText}>Ask Mitra AI</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Recent Connections</Text>
            <FlatList
                data={USERS}
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Theme.spacing.lg,
        paddingVertical: Theme.spacing.md,
        backgroundColor: Theme.colors.surface,
    },
    backBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Theme.colors.text,
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
    quickActions: {
        flexDirection: 'row',
        padding: Theme.spacing.lg,
        gap: 16,
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        gap: 10,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Theme.colors.text,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Theme.colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginLeft: Theme.spacing.lg,
        marginBottom: 8,
    },
    listContent: {
        padding: Theme.spacing.lg,
        gap: Theme.spacing.md,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        padding: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    userInfo: {
        flex: 1,
        marginLeft: 16,
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Theme.colors.text,
    },
    role: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
    },
});

export default CreateChatScreen;
