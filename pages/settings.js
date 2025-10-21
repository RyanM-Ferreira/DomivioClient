import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import StylesGlobal, { Colors } from '../stylesGlobal';
import Axios from 'axios';
import URL from '../src/db.js';

export default function SettingsScreen({ navigation }) {
    if (!localStorage.getItem('token')) {
        navigation.navigate('Login');
        return null; 
    }

    const email = localStorage.getItem('email');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        navigation.replace('Login');
    };

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Erro: Usuário não autenticado');
                return;
            }

            const response = await Axios.delete(`${URL}/users/${token}`);
            
            if (response.status === 200) {
                localStorage.clear();
                alert('Conta deletada com sucesso');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Erro ao deletar conta. Tente novamente.');
        }
    };

    return (
        <View style={StylesGlobal.bodyContainer}>
            <View style={StylesGlobal.header}>
                <View style={StylesGlobal.leftheader}>
                    <Text style={StylesGlobal.headerTitle}>Configurações</Text>
                </View>
                <View style={StylesGlobal.rightheader}>
                    <Image
                        source={require('../assets/icons/normal/settingsIcon.svg')}
                        style={StylesGlobal.icon}
                    />
                </View>
            </View>

            <Text style={styles.sectionTitle}>Cadastrado em nome de:</Text>
            <View style={styles.contentSection}>
                <Text style={styles.email}>{email || 'Email não disponível'}</Text>
                <TouchableOpacity
                    style={styles.logoutButton} 
                    onPress={handleLogout}
                >
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Privacidade</Text>
            <View style={styles.contentSection}>
                <Text style={styles.email}>Deletar conta</Text>
                <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={handleDeleteAccount}
                >
                    <Text style={styles.buttonText}>Deletar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primaryColor,
    },
    accountSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e8e8e8',
        padding: 10,
        borderRadius: 8,
        justifyContent: 'space-between',
        marginTop: 5
    },
    email: {
        fontSize: 14,
        color: Colors.primaryColor,
        flex: 1,
        marginRight: 10
    },
    logoutButton: {
        backgroundColor: Colors.primaryColor,
        borderRadius: 6,
        padding: 12,
        height: 24,
        width: 48,
        fontSize: 12,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    contentSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginTop: 10
    },
    switchLabel: {
        color: '#333',
        fontSize: 15
    },
    deleteButton: {
        backgroundColor: Colors.alertColor,
        borderRadius: 6,
        padding: 12,
        height: 24,
        width: 48,
        fontSize: 12,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },
});