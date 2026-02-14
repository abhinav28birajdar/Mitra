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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '@app-types/navigation.types';
import { useTheme } from '@context/ThemeContext';
import { courseService } from '@services/course/courseService';
import { Course } from '@app-types/firebase.types';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';

type CourseListRouteProp = RouteProp<MainStackParamList, 'CourseList'>;

const CourseListScreen: React.FC = () => {
    const { theme } = useTheme();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const route = useRoute<CourseListRouteProp>();
    const initialCategory = route.params?.category || 'All';

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    const categories = ['All', 'Technology', 'Business', 'Design', 'Data Science', 'Marketing', 'Soft Skills'];

    useEffect(() => {
        fetchCourses();
    }, [selectedCategory]);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const filters = selectedCategory === 'All' ? {} : { category: selectedCategory };
            const data = await courseService.getAllCourses(filters);
            setCourses(data as Course[]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderCourseItem = ({ item }: { item: Course }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.colors.background.paper, borderColor: theme.colors.border.light }]}
            onPress={() => navigation.navigate('CourseDetail', { courseId: item.id })}
        >
            <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
            <View style={styles.cardContent}>
                <View style={styles.categoryBadge}>
                    <Text style={[styles.categoryText, { color: theme.colors.primary[600] }]}>{item.category}</Text>
                </View>
                <Text style={[styles.title, { color: theme.colors.text.primary }]} numberOfLines={2}>{item.title}</Text>

                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Icon name="person-outline" size={14} color={theme.colors.text.secondary} />
                        <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>{item.instructorName}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Icon name="time-outline" size={14} color={theme.colors.text.secondary} />
                        <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>{item.duration}m</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.ratingRow}>
                        <Icon name="star" size={16} color="#FBBF24" />
                        <Text style={[styles.ratingText, { color: theme.colors.text.primary }]}>{item.rating.toFixed(1)}</Text>
                        <Text style={[styles.studentText, { color: theme.colors.text.disabled }]}>({item.studentCount})</Text>
                    </View>
                    <Text style={[styles.priceText, { color: theme.colors.primary[600] }]}>
                        {item.price === 0 ? 'Free' : `$${item.price}`}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper title="Courses" showBackButton={true}>
            <View style={styles.searchContainer}>
                <View style={[styles.searchBar, { backgroundColor: theme.colors.background.paper }]}>
                    <Icon name="search-outline" size={20} color={theme.colors.text.disabled} />
                    <TextInput
                        placeholder="What do you want to learn?"
                        placeholderTextColor={theme.colors.text.disabled}
                        style={[styles.searchInput, { color: theme.colors.text.primary }]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
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
                                styles.chipText,
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
                    data={courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))}
                    renderItem={renderCourseItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    numColumns={1}
                    ListEmptyComponent={
                        <View style={styles.centerSection}>
                            <Text style={{ color: theme.colors.text.secondary }}>No courses found.</Text>
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
    chipText: {
        fontSize: 14,
        fontWeight: '600',
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    card: {
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        overflow: 'hidden',
    },
    thumbnail: {
        width: '100%',
        height: 160,
    },
    cardContent: {
        padding: 16,
    },
    categoryBadge: {
        marginBottom: 8,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 24,
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    infoText: {
        marginLeft: 4,
        fontSize: 13,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        paddingTop: 12,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    studentText: {
        fontSize: 12,
        marginLeft: 4,
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    centerSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    }
});

export default CourseListScreen;
