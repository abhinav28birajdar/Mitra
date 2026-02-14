import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '@app-types/navigation.types';
import { useTheme } from '@context/ThemeContext';
import { careerService } from '@services/career/careerService';
import { Career } from '@app-types/firebase.types';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';

const CareerListScreen: React.FC = () => {
    const { theme } = useTheme();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

    const [careers, setCareers] = useState<Career[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Technology', 'Healthcare', 'Finance', 'Design', 'Business', 'Engineering'];

    useEffect(() => {
        fetchCareers();
    }, [selectedCategory]);

    const fetchCareers = async () => {
        setLoading(true);
        try {
            const categoryFilter = selectedCategory === 'All' ? undefined : selectedCategory;
            const data = await careerService.getAllCareers(categoryFilter);
            setCareers(data as Career[]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            fetchCareers();
            return;
        }
        setLoading(true);
        try {
            const results = await careerService.searchCareers(searchQuery);
            setCareers(results as Career[]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderCareerItem = ({ item }: { item: Career }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.colors.background.paper, borderColor: theme.colors.border.light }]}
            onPress={() => navigation.navigate('CareerDetail', { careerId: item.id })}
        >
            <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary[100] }]}>
                    <Icon name="briefcase-outline" size={24} color={theme.colors.primary[600]} />
                </View>
                <View style={styles.headerText}>
                    <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>{item.title}</Text>
                    <Text style={[styles.cardSub, { color: theme.colors.text.secondary }]}>{item.category} • {item.level}</Text>
                </View>
            </View>

            <Text style={[styles.cardDesc, { color: theme.colors.text.secondary }]} numberOfLines={2}>
                {item.description}
            </Text>

            <View style={styles.cardFooter}>
                <View style={styles.salaryTag}>
                    <Icon name="cash-outline" size={14} color={theme.colors.success.main} />
                    <Text style={[styles.salaryText, { color: theme.colors.success.main }]}>
                        {item.salaryRange.min.toLocaleString()} - {item.salaryRange.max.toLocaleString()} {item.salaryRange.currency}
                    </Text>
                </View>
                <View style={styles.demandTag}>
                    <Text style={[styles.demandText, { color: theme.colors.primary[600] }]}>
                        {item.demandLevel} Demand
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper title="Career Discovery" showBackButton={true}>
            <View style={styles.searchContainer}>
                <View style={[styles.searchBar, { backgroundColor: theme.colors.background.paper }]}>
                    <Icon name="search-outline" size={20} color={theme.colors.text.disabled} />
                    <TextInput
                        placeholder="Search careers..."
                        placeholderTextColor={theme.colors.text.disabled}
                        style={[styles.searchInput, { color: theme.colors.text.primary }]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                    />
                </View>
            </View>

            <View style={styles.filterContainer}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.categoryChip,
                                {
                                    backgroundColor: selectedCategory === item ? theme.colors.primary[600] : theme.colors.background.paper,
                                    borderColor: selectedCategory === item ? theme.colors.primary[600] : theme.colors.border.light
                                }
                            ]}
                            onPress={() => setSelectedCategory(item)}
                        >
                            <Text style={[
                                styles.categoryText,
                                { color: selectedCategory === item ? '#FFFFFF' : theme.colors.text.secondary }
                            ]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.categoryList}
                />
            </View>

            {loading ? (
                <View style={styles.centerSection}>
                    <ActivityIndicator size="large" color={theme.colors.primary[600]} />
                </View>
            ) : (
                <FlatList
                    data={careers}
                    renderItem={renderCareerItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={
                        <View style={styles.centerSection}>
                            <Text style={{ color: theme.colors.text.secondary }}>No careers found matching your search.</Text>
                        </View>
                    }
                />
            )}
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        height: 50,
        borderRadius: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    filterContainer: {
        marginBottom: 16,
    },
    categoryList: {
        paddingHorizontal: 16,
    },
    categoryChip: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    card: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        marginLeft: 12,
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardSub: {
        fontSize: 14,
    },
    cardDesc: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    salaryTag: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    salaryText: {
        marginLeft: 4,
        fontSize: 13,
        fontWeight: '600',
    },
    demandTag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: '#EEF2FF',
        borderRadius: 6,
    },
    demandText: {
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    centerSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    }
});

export default CareerListScreen;
