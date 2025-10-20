import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Axios from 'axios';
import URL from '../src/db.js';
/* Apparently, React Native doesn't have Linear Gradient like CSS, so it's necessary to
import an additional component*/
import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from '../stylesGlobal';
import StylesGlobal from '../stylesGlobal';
import axios from 'axios';

export default function AdvertisementAdd({ navigation }) {
    const [titulo, setTitulo] = useState('');
    const [local, setlocal] = useState('');
    const [Preco, setPreco] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [comodos, setComodos] = useState('');
    const [banheiros, setBanheiros] = useState('');
    const [garagens, setGaragens] = useState('');
    const [descricao, setDescricao] = useState('');
    const [user, setUser] = React.useState('');
    const [loading, setLoading] = useState(true);
    

    if (!localStorage.getItem('token')) {
        navigation.navigate('Login');
        return;
    }
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await Axios.get(`${URL}/users/${localStorage.getItem('token')}`);
                console.log('Dados do post:', response.data);
                setUser(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do post:', error);
                alert('Erro ao carregar dados do post');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    
    
    if (loading) {
        return (
            <View style={StylesGlobal.bodyContainer}>
                <Text>Carregando...</Text>
            </View>
        );
    }
    const userId = localStorage.getItem('token');



    const createAdv = async () => {
        try {
            const payload = {
                title: titulo,
                location: local,
                price: Preco,
                size: tamanho,
                rooms: comodos,
                bathrooms: banheiros,
                garage: garagens,
                description: descricao,
                userID: userId
            };

            const response = await Axios.post(`${URL}/ads`, payload);
            console.log('post criado com sucesso:', response.data);
            navigation.replace('MainTabs'); // navigate on success
        } catch (error) {
            console.error('Erro ao criar post:', error);
            alert('Erro ao criar post. Veja o console para detalhes.');
        }
    };

    if (user.userType !== "Vendedor") {
        console.log('Usuário não é vendedor, redirecionando para Home');
        navigation.replace('MainTabs');
        return;
    }

    return (
        
        <LinearGradient
            colors={[Colors.primaryColor, Colors.gradientColor]}
            style={StylesGlobal.gradientBodyContainer}>
            <ScrollView contentContainerStyle={StylesLogin.container} showsVerticalScrollIndicator={false}>
                <Text style={StylesLogin.title}>Criar Anúncio</Text>

                <Text style={StylesLogin.label}>Título do anúncio:</Text>
                <TextInput
                    style={StylesLogin.input}
                    placeholder="Ex: Casa com 3 quartos"
                    value={titulo}
                    onChangeText={setTitulo}
                />

                <Text style={StylesLogin.label}>Localização:</Text>
                <TextInput
                    style={StylesLogin.input}
                    placeholder="Ex: Rua Example, 123"
                    value={local}
                    onChangeText={setlocal}
                />

                <Text style={StylesLogin.label}>Preço:</Text>
                <TextInput
                    style={StylesLogin.input}
                    placeholder="R$ 0000,00"
                    value={Preco}
                    onChangeText={setPreco}
                    keyboardType="numeric"
                />

                <Text style={StylesLogin.label}>Tamanho (m²):</Text>
                <TextInput
                    style={StylesLogin.input}
                    placeholder="Ex: 100"
                    value={tamanho}
                    onChangeText={setTamanho}
                    keyboardType="numeric"
                />

                <Text style={StylesLogin.label}>Número de cômodos:</Text>
                <TextInput
                    style={StylesLogin.input}
                    placeholder="Ex: 5"
                    value={comodos}
                    onChangeText={setComodos}
                    keyboardType="numeric"
                />

                <Text style={StylesLogin.label}>Banheiros:</Text>
                <TextInput
                    style={StylesLogin.input}
                    placeholder="Ex: 2"
                    value={banheiros}
                    onChangeText={setBanheiros}
                    keyboardType="numeric"
                />

                <Text style={StylesLogin.label}>Vagas na garagem:</Text>
                <TextInput
                    style={StylesLogin.input}
                    placeholder="Ex: 2"
                    value={garagens}
                    onChangeText={setGaragens}
                    keyboardType="numeric"
                />

                <Text style={StylesLogin.label}>Descrição:</Text>
                <TextInput
                    style={[StylesLogin.input, { height: 100, textAlignVertical: 'top' }]}
                    placeholder="Descreva o imóvel..."
                    value={descricao}
                    onChangeText={setDescricao}
                    multiline
                    numberOfLines={4}
                />

                <TouchableOpacity style={StylesLogin.button} onPress={createAdv}>
                    <Text style={StylesLogin.buttonText}>Criar Anúncio</Text>
                </TouchableOpacity>
            </ScrollView >
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