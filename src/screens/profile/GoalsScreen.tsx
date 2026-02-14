
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    Modal,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import ScreenWrapper from '@components/ScreenWrapper';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchUserGoals, createGoal, updateGoalProgress, deleteGoal, Goal } from '@services/user/goalsService';
import CustomButton from '@components/CustomButton';

const GoalsScreen: React.FC = () => {
    const { user } = useAuth();
    const { theme } = useTheme();

    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    // New Goal Form
    const [newGoalTitle, setNewGoalTitle] = useState('');
    const [newGoalType, setNewGoalType] = useState('personal');

    useEffect(() => {
        if (user) {
            loadGoals();
        }
    }, [user]);

    const loadGoals = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const data = await fetchUserGoals(user.uid);
            setGoals(data);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to load goals');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateGoal = async () => {
        if (!newGoalTitle.trim() || !user) return;
        try {
            await createGoal({
                user_id: user.uid,
                title: newGoalTitle,
                goal_type: newGoalType as any,
                progress: 0,
                status: 'active',
                priority: 'medium'
            });
            setModalVisible(false);
            setNewGoalTitle('');
            loadGoals();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to create goal');
        }
    };

    const handleDeleteGoal = async (id: string) => {
        Alert.alert(
            'Delete Goal',
            'Are you sure you want to delete this goal?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteGoal(id);
                            loadGoals();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete goal');
                        }
                    }
                }
            ]
        );
    };

    const handleIncrementProgress = async (goal: Goal) => {
        if (goal.progress >= 100) return;
        const newProgress = Math.min(goal.progress + 10, 100);
        try {
            await updateGoalProgress(goal.id, newProgress);
            loadGoals(); // Refresh to see updates (or optimistically update)
        } catch (error) {
            console.error(error);
        }
    };

    const renderGoalItem = ({ item }: { item: Goal }) => (
        <View style={[styles.card, { backgroundColor: theme.colors.background.paper }]}>
            <View style={styles.cardHeader}>
                <View style={styles.titleRow}>
                    <Icon
                        name={item.status === 'completed' ? 'checkmark-circle' : 'flag-outline'}
                        size={24}
                        color={item.status === 'completed' ? theme.colors.success.main : theme.colors.primary[600]}
                    />
                    <Text style={[styles.goalTitle, { color: theme.colors.text.primary }]}>{item.title}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDeleteGoal(item.id)}>
                    <Icon name="trash-outline" size={20} color={theme.colors.error.main} />
                </TouchableOpacity>
            </View>

            <View style={styles.progressContainer}>
                <View style={[styles.progressBarBg, { backgroundColor: theme.colors.background.light }]}>
                    <View
                        style={[
                            styles.progressBarFill,
                            {
                                backgroundColor: item.status === 'completed' ? theme.colors.success.main : theme.colors.primary[600],
                                width: `${item.progress}%`
                            }
                        ]}
                    />
                </View>
                <Text style={[styles.progressText, { color: theme.colors.text.secondary }]}>{item.progress}%</Text>
            </View>

            {item.status !== 'completed' && (
                <TouchableOpacity
                    style={[styles.updateButton, { borderColor: theme.colors.primary[600] }]}
                    onPress={() => handleIncrementProgress(item)}
                >
                    <Text style={{ color: theme.colors.primary[600], fontWeight: '600' }}>+10% Progress</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <ScreenWrapper
            title="My Goals"
            showBackButton={true}
            headerRight={
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Icon name="add-circle" size={28} color={theme.colors.primary[600]} />
                </TouchableOpacity>
            }
        >
            {loading ? (
                <View style={[styles.center, { backgroundColor: theme.colors.background.light }]}>
                    <ActivityIndicator size="large" color={theme.colors.primary[600]} />
                </View>
            ) : (
                <FlatList
                    data={goals}
                    renderItem={renderGoalItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Icon name="flag-outline" size={48} color={theme.colors.text.disabled} />
                            <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>No goals set yet.</Text>
                            <CustomButton
                                title="Create Goal"
                                onPress={() => setModalVisible(true)}
                                style={{ marginTop: 20 }}
                            />
                        </View>
                    }
                />
            )}

            {/* Create Goal Modal */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: theme.colors.background.paper }]}>
                        <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>New Goal</Text>

                        <TextInput
                            placeholder="Goal Title (e.g. Learn React Native)"
                            placeholderTextColor={theme.colors.text.disabled}
                            style={[styles.input, { color: theme.colors.text.primary, borderColor: theme.colors.border.light }]}
                            value={newGoalTitle}
                            onChangeText={setNewGoalTitle}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: theme.colors.gray[200] }]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={{ color: theme.colors.text.primary }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: theme.colors.primary[600] }]}
                                onPress={handleCreateGoal}
                            >
                                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },
    goalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
    },
    progressBarBg: {
        flex: 1,
        height: 8,
        borderRadius: 4,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 12,
        fontWeight: '600',
        width: 35,
    },
    updateButton: {
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 60,
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        marginTop: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        padding: 24,
        borderRadius: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        marginBottom: 20,
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    }
});

export default GoalsScreen;
