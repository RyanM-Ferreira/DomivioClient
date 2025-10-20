import React, { useState, useEffect, useRef } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    FlatList, 
    Image,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import StylesGlobal, { Colors } from '../stylesGlobal';
import Axios from 'axios';
import URL from '../src/db.js';

export default function ChatIn({ route, navigation }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const flatListRef = useRef();
    const { chatId } = route.params;

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await Axios.get(`${URL}/chats/${chatId}/messages`);
                setMessages(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching messages:', error);
                alert('Erro ao carregar mensagens');
            }
        };

        fetchMessages();
        // Set up polling for new messages
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, [chatId]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const userId = localStorage.getItem('token');
            const response = await Axios.post(`${URL}/chats/${chatId}/messages`, {
                userId,
                content: newMessage.trim()
            });

            setMessages(prev => [...prev, response.data]);
            setNewMessage('');
            flatListRef.current?.scrollToEnd();
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Erro ao enviar mensagem');
        }
    };

    const renderMessage = ({ item }) => {
        const isMyMessage = item.userId === localStorage.getItem('token');
        
        return (
            <View style={[
                styles.messageContainer,
                isMyMessage ? styles.myMessage : styles.otherMessage
            ]}>
                <Text style={styles.messageText}>{item.content}</Text>
                <Text style={styles.timeStamp}>
                    {new Date(item.createdAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    })}
                </Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView 
            style={StylesGlobal.bodyContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={StylesGlobal.header}>
                <View style={StylesGlobal.leftheader}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image 
                            source={require('../assets/icons/normal/leftArrow.svg')} 
                            style={StylesGlobal.backIcon} 
                        />
                    </TouchableOpacity>
                </View>
                <View style={StylesGlobal.rightheader}>
                    <Text style={StylesGlobal.headerTitle}>Chat</Text>
                </View>
            </View>

            {loading ? (
                <View style={styles.centerContent}>
                    <Text>Carregando...</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={item => item.id.toString()}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                    />

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={newMessage}
                            onChangeText={setNewMessage}
                            placeholder="Digite sua mensagem..."
                            multiline
                        />
                        <TouchableOpacity 
                            style={styles.sendButton} 
                            onPress={sendMessage}
                        >
                            <Image 
                                source={require('../assets/icons/normal/sendIcon.svg')} 
                                style={styles.sendIcon} 
                            />
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    messageContainer: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
        marginVertical: 4,
        marginHorizontal: 8,
    },
    myMessage: {
        backgroundColor: Colors.primaryColor,
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
    },
    otherMessage: {
        backgroundColor: '#eee',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        color: '#fff',
        fontSize: 16,
    },
    timeStamp: {
        fontSize: 10,
        color: '#rgba(255,255,255,0.7)',
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 8,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        maxHeight: 100,
    },
    sendButton: {
        width: 44,
        height: 44,
        backgroundColor: Colors.primaryColor,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendIcon: {
        width: 24,
        height: 24,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});