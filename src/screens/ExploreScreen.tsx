import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { CAREERS } from '../constants/mocks';

const CATEGORIES = ['All', 'Technology', 'Healthcare', 'Business', 'Creative', 'Science'];

const ExploreScreen = () => {
    const navigation = useNavigation<any>();
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const renderItem = ({ item }: { item: typeof CAREERS[0] }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CareerDetail', { careerId: item.id })}
            activeOpacity={0.9}
        >
            <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                    <Ionicons name="briefcase-outline" size={24} color={Theme.colors.primary} />
                </View>
                <TouchableOpacity style={styles.bookmarkButton}>
                    <Ionicons name="bookmark-outline" size={20} color={Theme.colors.gray} />
                </TouchableOpacity>
            </View>

            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardIndustry}>{item.industry.toUpperCase()}</Text>

            <View style={styles.statsRow}>
                <View style={styles.stat}>
                    <Ionicons name="stats-chart-outline" size={14} color={Theme.colors.primary} />
                    <Text style={styles.statText}>{item.growth} Growth</Text>
                </View>
                <View style={styles.stat}>
                    <Ionicons name="cash-outline" size={14} color={Theme.colors.secondary} />
                    <Text style={styles.statText}>{item.salary}</Text>
                </View>
            </View>

            <View style={styles.cardFooter}>
                <View style={styles.matchBadge}>
                    <Ionicons name="sparkles" size={10} color={Theme.colors.primary} />
                    <Text style={styles.matchText}>{item.match}% AI Match</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Theme.colors.gray} />
            </View>
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper useGradient>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Discovery</Text>
                <TouchableOpacity style={styles.notificationButton}>
                    <Ionicons name="options-outline" size={24} color={Theme.colors.text} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchSection}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={Theme.colors.gray} style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search careers or skills..."
                        value={search}
                        onChangeText={setSearch}
                        style={styles.searchInput}
                        placeholderTextColor={Theme.colors.gray}
                    />
                </View>
            </View>

            <View style={styles.categorySection}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.categoryChip,
                                selectedCategory === cat && styles.selectedCategoryChip
                            ]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={[
                                styles.categoryText,
                                selectedCategory === cat && styles.selectedCategoryText
                            ]}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={CAREERS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={1}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <Text style={styles.resultsCount}>Found {CAREERS.length} careers for you</Text>
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
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: Theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    searchSection: {
        paddingHorizontal: Theme.spacing.lg,
        marginBottom: Theme.spacing.md,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius.lg,
        height: 54,
        paddingHorizontal: Theme.spacing.md,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    searchIcon: {
        marginRight: Theme.spacing.sm,
    },
    searchInput: {
        flex: 1,
        fontSize: Theme.typography.fontSize.base,
        color: Theme.colors.text,
    },
    categorySection: {
        marginBottom: Theme.spacing.md,
    },
    categoryList: {
        paddingHorizontal: Theme.spacing.lg,
        gap: Theme.spacing.sm,
    },
    categoryChip: {
        paddingHorizontal: Theme.spacing.lg,
        paddingVertical: Theme.spacing.sm,
        borderRadius: Theme.borderRadius.full,
        backgroundColor: Theme.colors.surface,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    selectedCategoryChip: {
        backgroundColor: Theme.colors.primary,
        borderColor: Theme.colors.primary,
    },
    categoryText: {
        fontSize: Theme.typography.fontSize.sm,
        fontWeight: Theme.typography.fontWeight.medium as any,
        color: Theme.colors.textSecondary,
    },
    selectedCategoryText: {
        color: Theme.colors.white,
    },
    listContainer: {
        padding: Theme.spacing.lg,
        paddingTop: 0,
    },
    resultsCount: {
        fontSize: Theme.typography.fontSize.xs,
        color: Theme.colors.textSecondary,
        marginBottom: Theme.spacing.md,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    card: {
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.borderRadius['2xl'],
        padding: Theme.spacing.lg,
        marginBottom: Theme.spacing.md,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Theme.spacing.md,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookmarkButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: Theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: Theme.typography.fontSize.lg,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
        marginBottom: 4,
    },
    cardIndustry: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Theme.colors.primary,
        letterSpacing: 1,
        marginBottom: Theme.spacing.md,
    },
    statsRow: {
        flexDirection: 'row',
        gap: Theme.spacing.lg,
        marginBottom: Theme.spacing.lg,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statText: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
        fontWeight: Theme.typography.fontWeight.medium as any,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,
    },
    matchBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF2FF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        gap: 4,
    },
    matchText: {
        fontSize: 10,
        color: Theme.colors.primary,
        fontWeight: 'bold',
    },
});

export default ExploreScreen;
