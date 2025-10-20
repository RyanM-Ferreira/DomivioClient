import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Axios from 'axios';
import URL from '../src/db.js';

/* Apparently, React Native doesn't have Linear Gradient like CSS, so it's necessary to
import an additional component*/
import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from '../stylesGlobal';
import StylesGlobal from '../stylesGlobal';

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');



    if (localStorage.getItem('token')) {
        navigation.navigate('Profile');
    }


    const LoginHandler = async () => {
        try {
            const response = await Axios.get(`${URL}/users`, { params: { email } });
            const data = response.data;


            if (!data || (Array.isArray(data) && data.length === 0)) {
                alert('Nenhum Usuário não encontrado.');
                return;
            }


            let user = null;
            const users = Array.isArray(data) ? data : [data];
            users.forEach(u => {
                if (u.email === email) {
                    user = u;
                }
            });


            console.log('User found:', user);
            if (user.password !== senha) {
                alert('Senha incorreta.');
                return;
            }


            localStorage.setItem('token', user.userID);
            localStorage.setItem('email', user.email);
            localStorage.setItem('name', user.name);

            navigation.navigate('Profile');

        } catch (error) {
            console.error('Login error', error);
            alert('Erro ao efetuar login: ' + (error.message || error));
        }
    };


    return (
        <LinearGradient
            colors={[Colors.primaryColor, Colors.gradientColor]}
            style={StylesGlobal.gradientBodyContainer}>
            <View style={StylesLogin.container} showsHorizontalScrollIndicator={false}>
                <Text style={StylesLogin.title}>Entrar</Text>

                <Text style={StylesLogin.label}>E-mail:</Text>
                <TextInput
                    style={StylesLogin.input}
                    placeholder="email@dominio.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <Text style={StylesLogin.label}>Senha:</Text>
                <TextInput
                    style={StylesLogin.input}
                    placeholder="******"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                />

                <TouchableOpacity>
                    <Text onPress={() => navigation.navigate('SignUp')} style={StylesLogin.loginLink}>Não possui uma conta? Crie aqui!</Text>
                </TouchableOpacity>

                <TouchableOpacity style={StylesLogin.button}>
                    <Text style={StylesLogin.buttonText} onPress={LoginHandler}>Entrar</Text>
                </TouchableOpacity>
            </View >
        </LinearGradient >
    );
}

const StylesLogin = StyleSheet.create({
    title: {
        fontSize: 28,
        color: Colors.primaryColor,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        justifyContent: 'center',
        marginVertical: 'auto',
    },
    label: {
        marginBottom: 5,
        marginTop: 10,
        fontSize: 15
    },
    input: {
        borderWidth: 2,
        borderColor: Colors.primaryColor,
        borderRadius: 8,
        padding: 10,
        color: 'black',
    },
    loginLink: {
        marginTop: 20,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        backgroundColor: Colors.primaryColor,
        padding: 15,
        borderRadius: 10,
        marginVertical: 8
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});