import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { aiService } from '@services/ai/aiService';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@components/ScreenWrapper';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    createdAt: any;
}

const AdvisorScreen: React.FC = () => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (user) {
            fetchHistory();
        }
    }, [user]);

    const fetchHistory = async () => {
        try {
            const history = await aiService.getChatHistory(user!.uid);
            if (history.length === 0) {
                // Add welcome message if new chat
                const welcome: Message = {
                    id: 'welcome',
                    text: "Hi! I'm your Mitra AI Advisor. How can I help you today?",
                    sender: 'ai',
                    createdAt: { seconds: Date.now() / 1000 }
                };
                setMessages([welcome]);
            } else {
                setMessages(history as Message[]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setInitialLoading(false);
        }
    };

    const handleSend = async () => {
        if (!inputText.trim() || !user) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            createdAt: { seconds: Date.now() / 1000 }
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setLoading(true);

        try {
            const aiResponse = await aiService.sendMessage(user.uid, inputText);
            setMessages(prev => [...prev, aiResponse as Message]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View style={[
            styles.messageBubble,
            item.sender === 'user' ? styles.userBubble : styles.aiBubble,
            { backgroundColor: item.sender === 'user' ? theme.colors.primary[600] : theme.colors.background.paper }
        ]}>
            <Text style={[
                styles.messageText,
                { color: item.sender === 'user' ? '#FFFFFF' : theme.colors.text.primary }
            ]}>
                {item.text}
            </Text>
        </View>
    );

    if (initialLoading) {
        return (
            <View style={[styles.center, { backgroundColor: theme.colors.background.light }]}>
                <ActivityIndicator size="large" color={theme.colors.primary[600]} />
            </View>
        );
    }

    return (
        <ScreenWrapper title="AI Advisor" showBackButton={true}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.chatList}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                />

                {loading && (
                    <View style={styles.typingContainer}>
                        <Text style={[styles.typingText, { color: theme.colors.text.secondary }]}>AI is thinking...</Text>
                    </View>
                )}

                <View style={[styles.inputWrapper, { backgroundColor: theme.colors.background.paper, borderTopColor: theme.colors.border.light }]}>
                    <TextInput
                        style={[styles.input, { color: theme.colors.text.primary, backgroundColor: theme.colors.background.light }]}
                        placeholder="Ask me anything..."
                        placeholderTextColor={theme.colors.text.disabled}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, { backgroundColor: theme.colors.primary[600] }]}
                        onPress={handleSend}
                        disabled={loading}
                    >
                        <Icon name="send" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatList: {
        padding: 16,
        paddingBottom: 20,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 14,
        borderRadius: 16,
        marginBottom: 12,
    },
    userBubble: {
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
    },
    aiBubble: {
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 22,
    },
    typingContainer: {
        paddingHorizontal: 20,
        paddingBottom: 8,
    },
    typingText: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 12,
        borderTopWidth: 1,
    },
    input: {
        flex: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 10,
        maxHeight: 100,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default AdvisorScreen;
