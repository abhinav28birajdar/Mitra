import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator,
    TextInput,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '@app-types/navigation.types';
import { useTheme } from '@context/ThemeContext';
import { courseService } from '@services/course/courseService';
import { careerService } from '@services/career/careerService';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';
import Badge from '@components/ui/Badge';

const { width } = Dimensions.get('window');

const ExploreScreen: React.FC = () => {
    const { theme } = useTheme();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

    const [allCourses, setAllCourses] = useState<any[]>([]);
    const [featuredCourses, setFeaturedCourses] = useState<any[]>([]);
    const [topCareers, setTopCareers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    useEffect(() => {
        fetchExploreData();
    }, []);

    const fetchExploreData = async () => {
        try {
            const courses = await courseService.getAllCourses();
            const careers = await careerService.getAllCareers();
            setAllCourses(courses);
            setFeaturedCourses(courses.slice(0, 4));
            setTopCareers(careers.slice(0, 6));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        if (text.trim().length > 0) {
            const filtered = allCourses.filter(c =>
                c.title?.toLowerCase().includes(text.toLowerCase()) ||
                c.category?.toLowerCase().includes(text.toLowerCase())
            );
            setSearchResults(filtered);
        } else {
            setSearchResults([]);
        }
    };

    if (loading) {
        return (
            <View style={[styles.center, { backgroundColor: theme.colors.background.light }]}>
                <ActivityIndicator size="large" color={theme.colors.primary[600]} />
            </View>
        );
    }

    const categories = [
        { id: '1', name: 'Coding', icon: 'code-slash-outline', color: '#4F46E5' },
        { id: '2', name: 'Design', icon: 'color-palette-outline', color: '#EC4899' },
        { id: '3', name: 'Business', icon: 'business-outline', color: '#F59E0B' },
        { id: '4', name: 'Science', icon: 'flask-outline', color: '#10B981' },
    ];

    const renderCourseItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={[styles.miniCourseCard, { backgroundColor: theme.colors.background.paper }]}
            onPress={() => navigation.navigate('CourseDetail', { courseId: item.id, course: item })}
        >
            <Image source={{ uri: item.thumbnailUrl }} style={styles.miniThumbnail} />
            <View style={styles.miniContent}>
                <Text style={[styles.miniTitle, { color: theme.colors.text.primary }]} numberOfLines={2}>{item.title}</Text>
                <View style={styles.ratingRow}>
                    <Icon name="star" size={14} color="#FBBF24" />
                    <Text style={[styles.ratingText, { color: theme.colors.text.secondary }]}>{item.rating || '4.5'} ({item.studentCount || 0})</Text>
                    <Text style={[styles.priceTag, { color: theme.colors.primary[600] }]}>{item.price === 0 ? 'Free' : `$${item.price}`}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper hideHeader={true}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>Explore</Text>
                <TouchableOpacity
                    style={[styles.searchContainer, { backgroundColor: theme.colors.background.paper, borderColor: theme.colors.border.light }]}
                    activeOpacity={1}
                >
                    <Icon name="search-outline" size={20} color={theme.colors.text.disabled} />
                    <TextInput
                        placeholder="Search courses, careers..."
                        placeholderTextColor={theme.colors.text.disabled}
                        style={[styles.searchInput, { color: theme.colors.text.primary }]}
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => handleSearch('')}>
                            <Icon name="close-circle" size={18} color={theme.colors.text.disabled} />
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {searchQuery.length > 0 ? (
                    <View style={styles.searchResultsSection}>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Search Results</Text>
                        {searchResults.length > 0 ? (
                            searchResults.map(course => (
                                <View key={course.id} style={{ marginBottom: 12 }}>
                                    {renderCourseItem({ item: course })}
                                </View>
                            ))
                        ) : (
                            <View style={styles.emptySearch}>
                                <Icon name="search" size={48} color={theme.colors.text.disabled} />
                                <Text style={[styles.emptySearchText, { color: theme.colors.text.secondary }]}>No courses found for "{searchQuery}"</Text>
                            </View>
                        )}
                    </View>
                ) : (
                    <>
                        {/* Categories */}
                        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Categories</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
                            {categories.map((cat) => (
                                <TouchableOpacity
                                    key={cat.id}
                                    style={[styles.categoryCircle, { backgroundColor: theme.colors.background.paper }]}
                                    onPress={() => navigation.navigate('CourseList', { category: cat.name })}
                                >
                                    <View style={[styles.iconCircle, { backgroundColor: cat.color + '15' }]}>
                                        <Icon name={cat.icon} size={24} color={cat.color} />
                                    </View>
                                    <Text style={[styles.categoryLabel, { color: theme.colors.text.primary }]}>{cat.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Top Careers */}
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Career Paths</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('CareerList', {})}>
                                <Text style={{ color: theme.colors.primary[600], fontWeight: 'bold' }}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={topCareers}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.careerCard, { backgroundColor: theme.colors.background.paper }]}
                                    onPress={() => navigation.navigate('CareerDetail', { careerId: item.id, career: item })}
                                >
                                    <Badge label="HIGH DEMAND" variant="success" size="sm" style={styles.careerBadge} />
                                    <Text style={[styles.careerTitle, { color: theme.colors.text.primary }]} numberOfLines={2}>{item.title}</Text>
                                    <Text style={[styles.careerMeta, { color: theme.colors.text.secondary }]}>{item.category} • {item.growthRate || '15%'} Growth</Text>
                                </TouchableOpacity>
                            )}
                            contentContainerStyle={styles.horizontalList}
                        />

                        {/* Popular Courses */}
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Popular Courses</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('CourseList', {})}>
                                <Text style={{ color: theme.colors.primary[600], fontWeight: 'bold' }}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.courseGrid}>
                            {featuredCourses.map((item) => (
                                <View key={item.id}>
                                    {renderCourseItem({ item })}
                                </View>
                            ))}
                        </View>
                    </>
                )}
                <View style={{ height: 100 }} />
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        borderWidth: 1,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        padding: 0,
    },
    scrollContent: {
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 32,
    },
    categoryList: {
        paddingRight: 24,
    },
    categoryCircle: {
        width: 85,
        alignItems: 'center',
        marginRight: 16,
    },
    iconCircle: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1,
    },
    categoryLabel: {
        fontSize: 13,
        fontWeight: '600',
    },
    horizontalList: {
        paddingRight: 24,
    },
    careerCard: {
        width: 180,
        padding: 16,
        borderRadius: 20,
        marginRight: 16,
        height: 140,
        justifyContent: 'space-between',
    },
    careerBadge: {
        alignSelf: 'flex-start',
    },
    careerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 22,
    },
    careerMeta: {
        fontSize: 12,
        fontWeight: '500',
    },
    courseGrid: {
        gap: 16,
    },
    miniCourseCard: {
        flexDirection: 'row',
        padding: 12,
        borderRadius: 20,
        alignItems: 'center',
    },
    miniThumbnail: {
        width: 100,
        height: 80,
        borderRadius: 14,
        marginRight: 16,
    },
    miniContent: {
        flex: 1,
    },
    miniTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 12,
    },
    priceTag: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 'auto',
    },
    searchResultsSection: {
        marginTop: 20,
    },
    emptySearch: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptySearchText: {
        marginTop: 16,
        fontSize: 16,
        textAlign: 'center',
    }
});

export default ExploreScreen;
