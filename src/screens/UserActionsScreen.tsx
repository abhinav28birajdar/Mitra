import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../theme';

const UserActionsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { userName = 'User' } = route.params || {};

    const actions = [
        { id: 'report', title: 'Report ' + userName, icon: 'flag-outline', color: Theme.colors.error },
        { id: 'block', title: 'Block ' + userName, icon: 'ban-outline', color: Theme.colors.error },
        { id: 'share', title: 'Share Profile', icon: 'share-outline', color: Theme.colors.text },
        { id: 'mute', title: 'Mute Notifications', icon: 'notifications-off-outline', color: Theme.colors.text },
    ];

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={() => navigation.goBack()}
            />
            <View style={styles.sheet}>
                <View style={styles.handle} />
                <Text style={styles.title}>Actions</Text>

                <View style={styles.actionList}>
                    {actions.map((action) => (
                        <TouchableOpacity
                            key={action.id}
                            style={styles.actionItem}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name={action.icon as any} size={22} color={action.color} />
                            <Text style={[styles.actionText, { color: action.color }]}>{action.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    sheet: {
        backgroundColor: Theme.colors.surface,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        paddingBottom: 40,
    },
    handle: {
        width: 40,
        height: 5,
        backgroundColor: Theme.colors.border,
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Theme.colors.text,
        marginBottom: 20,
        textAlign: 'center',
    },
    actionList: {
        gap: 8,
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 16,
        borderRadius: 16,
        backgroundColor: '#F8FAFC',
    },
    actionText: {
        fontSize: 16,
        fontWeight: '600',
    },
    cancelBtn: {
        marginTop: 16,
        padding: 16,
        alignItems: 'center',
    },
    cancelText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Theme.colors.gray,
    },
});

export default UserActionsScreen;
