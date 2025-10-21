import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

import StylesGlobal from '../stylesGlobal';
import { Colors } from '../stylesGlobal';
import Axios from 'axios';
import URL from '../src/db.js';

export default function Profile({ navigation }) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = useState(true);

    if (!localStorage.getItem('token')) {
        navigation.navigate('Login');
        return;
    }
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await Axios.get(`${URL}/users/${localStorage.getItem('token')}`);
                console.log('Dados do usuário:', response.data);
                setUser(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                alert('Erro ao carregar dados do usuário');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <View style={StylesGlobal.bodyContainer}>
                <Text style={StylesGlobal.loadingText}>Carregando...</Text>
            </View>
        );
    }
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    return (
        <View style={StylesGlobal.bodyContainer}>
            <View style={StylesGlobal.header}>
                <View style={StylesGlobal.leftheader}>
                    <TouchableOpacity style={StylesGlobal.backButton} onPress={() => navigation.replace('MainTabs')} >
                        <Image source={require('../assets/icons/normal/leftArrow.svg')} style={StylesGlobal.backIcon} />
                    </TouchableOpacity>
                </View>
                <View style={StylesGlobal.rightheader}>
                    <Text style={StylesGlobal.headerTitle}>Perfil</Text>
                </View>
            </View>

            <ScrollView>
                <View style={styles.userCard}>
                    <View style={styles.userCardLeft}>
                        <View style={styles.avatarBox}>
                            <Image
                                source={require('../assets/icons/alt/personIcon.svg')}
                                style={styles.avatarIcon}
                            />
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}> {name} </Text>
                            <Text style={styles.userDesc}> {user?.userType}</Text>

                        </View>
                    </View>
                    <TouchableOpacity style={styles.userCardRight}>
                        <Image
                            source={require('../assets/icons/normal/logoutIcon.svg')}
                            style={styles.exitProfileIcon}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.infoCard}>
                    <View style={styles.infoCardHeader}>
                        <Text style={styles.infoCardTitle}>Informações Pessoais:</Text>
                    </View>
                    <Text style={styles.infoLine}>
                        <Text style={styles.infoLabel}>E-mail: </Text>
                        {email}
                    </Text>
                    <Text style={styles.infoLine}>
                        <Text style={styles.infoLabel}>Phone: </Text>
                        {user?.tel}
                    </Text>
                    <Text style={styles.infoLine}>
                        <Text style={styles.infoLabel}>Data de nascimento: </Text>
                        {user?.birthday}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    userCard: {
        borderRadius: 12,
        marginBottom: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    userCardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '80%',
    },
    avatarBox: {
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    avatarIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    userInfo: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    userName: {
        color: Colors.primaryColor,
        fontWeight: 'bold',
        fontSize: 18,
    },
    userDesc: {
        fontSize: 12,
    },
    userCardRight: {
        padding: 8,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginLeft: 12,
        marginBottom: 25,
    },
    exitProfileIcon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        tintColor: Colors.primaryColor,
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        padding: 16,
    },
    infoCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        justifyContent: 'space-between',
    },
    infoCardTitle: {
        color: Colors.primaryColor,
        fontWeight: 'bold',
        fontSize: 16,
    },
    editBtn: {
        backgroundColor: Colors.primaryColor,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    editBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
    },
    infoLine: {
        fontSize: 14,
        marginBottom: 4,
    },
    infoLabel: {
        color: Colors.primaryColor,
        fontWeight: 'bold',
    },
});