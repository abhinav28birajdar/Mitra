import React from 'react';
import { View, StyleSheet, StatusBar, ViewStyle, Platform, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface ScreenWrapperProps {
    children: React.ReactNode;
    title?: string;
    showBackButton?: boolean;
    headerRight?: React.ReactNode;
    style?: ViewStyle;
    hideHeader?: boolean;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
    children,
    title,
    showBackButton = false,
    headerRight,
    style,
    hideHeader = false,
}) => {
    const { theme } = useTheme();
    const navigation = useNavigation();

    const renderHeader = () => {
        if (hideHeader) return null;

        // If title, back button, or headerRight is present, show header
        if (title || showBackButton || headerRight) {
            return (
                <View style={[styles.header, { borderBottomColor: theme.colors.border.light }]}>
                    <View style={styles.headerLeft}>
                        {showBackButton && (
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {title && (
                        <View style={styles.titleContainer}>
                            <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>{title}</Text>
                        </View>
                    )}

                    <View style={styles.headerRight}>
                        {headerRight}
                    </View>
                </View>
            );
        }
        return null;
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.light }, style]}>
            <StatusBar
                barStyle={theme.isDark ? 'light-content' : 'dark-content'}
                backgroundColor="transparent"
                translucent
            />
            <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
                {renderHeader()}
                <View style={[styles.content]}>
                    {children}
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
    },
    headerLeft: {
        width: 44,
        justifyContent: 'center',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerRight: {
        width: 44,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    backButton: {
        padding: 4,
    },
    content: {
        flex: 1,
    },
});

export default ScreenWrapper;
