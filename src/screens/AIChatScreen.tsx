import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Animated, ScrollView } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { Theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    time: string;
}

const AIChatScreen = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm Mitra, your AI career coach. How can I assist your professional growth today?",
            isUser: false,
            time: '12:00 PM',
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: input,
            isUser: true,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prev => [...prev, newMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            setIsTyping(false);
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: "That's an interesting question about UI design. In 2025, the focus will shift more towards responsive AI-generated components. Do you want me to suggest some learning resources for this?",
                isUser: false,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 2000);
    };

    useEffect(() => {
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }, [messages, isTyping]);

    const renderMessage = ({ item }: { item: Message }) => (
        <View style={[
            styles.messageContainer,
            item.isUser ? styles.userContainer : styles.aiContainer
        ]}>
            <View style={[
                styles.bubble,
                item.isUser ? styles.userBubble : styles.aiBubble
            ]}>
                <Text style={[
                    styles.messageText,
                    item.isUser ? styles.userText : styles.aiText
                ]}>{item.text}</Text>
                <Text style={[
                    styles.timeText,
                    item.isUser ? styles.userTime : styles.aiTime
                ]}>{item.time}</Text>
            </View>
        </View>
    );

    return (
        <ScreenWrapper useGradient>
            <View style={styles.header}>
                <View style={styles.headerInfo}>
                    <View style={styles.aiCircle}>
                        <Ionicons name="sparkles" size={20} color={Theme.colors.white} />
                    </View>
                    <View>
                        <Text style={styles.headerTitle}>Mitra AI</Text>
                        <View style={styles.statusRow}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>Always active</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.historyButton}>
                    <Ionicons name="time-outline" size={24} color={Theme.colors.text} />
                </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={isTyping ? (
                    <View style={styles.typingContainer}>
                        <View style={styles.aiBubble}>
                            <Text style={styles.typingText}>Mitra is thinking...</Text>
                        </View>
                    </View>
                ) : null}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View style={styles.bottomSection}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.suggestions}
                    >
                        {['Explain Roadmap', 'Latest Tech Jobs', 'Review Profile', 'Mock Interview'].map((s) => (
                            <TouchableOpacity key={s} style={styles.suggestionChip}>
                                <Text style={styles.suggestionText}>{s}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.inputBar}>
                        <TouchableOpacity style={styles.actionBtn}>
                            <Ionicons name="add-circle-outline" size={28} color={Theme.colors.gray} />
                        </TouchableOpacity>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={[styles.input, { maxHeight: 100 }]}
                                placeholder="Message Mitra..."
                                value={input}
                                onChangeText={setInput}
                                placeholderTextColor={Theme.colors.gray}
                                multiline
                            />
                        </View>
                        <TouchableOpacity
                            style={[styles.sendBtn, !input.trim() && styles.disabledSend]}
                            onPress={handleSend}
                            disabled={!input.trim()}
                        >
                            <Ionicons name="paper-plane" size={20} color={Theme.colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
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
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Theme.spacing.md,
    },
    aiCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: Theme.typography.fontWeight.bold as any,
        color: Theme.colors.text,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Theme.colors.success,
    },
    statusText: {
        fontSize: 10,
        color: Theme.colors.textSecondary,
        fontWeight: 'bold',
    },
    historyButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: Theme.spacing.lg,
        gap: Theme.spacing.lg,
    },
    messageContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    userContainer: {
        justifyContent: 'flex-end',
    },
    aiContainer: {
        justifyContent: 'flex-start',
    },
    bubble: {
        maxWidth: '80%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1,
    },
    userBubble: {
        backgroundColor: Theme.colors.primary,
        borderBottomRightRadius: 4,
    },
    aiBubble: {
        backgroundColor: Theme.colors.surface,
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 22,
    },
    userText: {
        color: Theme.colors.white,
    },
    aiText: {
        color: Theme.colors.text,
    },
    timeText: {
        fontSize: 10,
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    userTime: {
        color: 'rgba(255,255,255,0.7)',
    },
    aiTime: {
        color: Theme.colors.textSecondary,
    },
    typingContainer: {
        flexDirection: 'row',
        marginBottom: Theme.spacing.md,
    },
    typingText: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
        fontStyle: 'italic',
    },
    bottomSection: {
        backgroundColor: Theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    },
    suggestions: {
        paddingHorizontal: Theme.spacing.lg,
        paddingVertical: Theme.spacing.md,
        gap: Theme.spacing.sm,
    },
    suggestionChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: Theme.colors.background,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    suggestionText: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
        fontWeight: 'bold',
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.md,
        paddingBottom: Theme.spacing.sm,
        gap: 8,
    },
    actionBtn: {
        padding: 4,
    },
    inputWrapper: {
        flex: 1,
        backgroundColor: Theme.colors.background,
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    input: {
        fontSize: 15,
        color: Theme.colors.text,
        maxHeight: 100,
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledSend: {
        backgroundColor: Theme.colors.gray,
    },
});

export default AIChatScreen;
