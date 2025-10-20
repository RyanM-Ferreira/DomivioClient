import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import StylesGlobal, { Colors } from '../stylesGlobal';
import Axios from 'axios';
import URL from '../src/db.js';

export default function Chat({ navigation }) {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const userId = localStorage.getItem('token');
                if (!userId) {
                    console.log('No user token found');
                    navigation.replace('Login');
                    return;
                }


                const response = await Axios.get(`${URL}/chats/`);
                console.log(response.data);

                let currentChats = [];

                response.data.forEach(chat => {
                    if (chat.user1ID == userId) {
                        currentChats.push(chat);
                    }
                });
                setChats(currentChats);
            } catch (error) {
                console.error('Error fetching chats:', error);
                alert('Erro ao carregar conversas');
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, []);



    return (
        <ScrollView style={StylesGlobal.bodyContainer} showsHorizontalScrollIndicator={false}>
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
                    <Text style={StylesGlobal.headerTitle}>Mensagens</Text>
                </View>
            </View>

            {loading ? (
                <View style={styles.centerContent}>
                    <Text>Carregando...</Text>
                </View>
            ) : chats.length === 0 ? (
                <View style={styles.centerContent}>
                    <Text>Nenhuma conversa encontrada</Text>
                </View>
            ) : (
                chats.map((chat, index) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('ChatIn', { chatID: chat.chatID })}
                        key={index}
                    >
                        <View style={styles.avatar}>
                            <Image
                                source={require('../assets/icons/alt/personIcon.svg')}
                                style={styles.avatarIcon}
                            />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.name}>{chat.User2.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 16,
        width: '100%',
        height: 64,
    },
    avatar: {
        marginRight: 12,
        backgroundColor: Colors.primaryColor,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarIcon: {
        width: 35,
        height: 30,
        resizeMode: 'contain',
    },
    info: {
        flex: 1,
    },
    name: {
        color: Colors.primaryColor,
        fontWeight: 'bold',
        fontSize: 18,
    },
    lastMessage: {
        color: '#000',
        fontSize: 14,
    },
    timeStamp: {
        fontSize: 12,
        color: '#999',
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});