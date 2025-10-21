import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

import { DatePickerModal } from 'react-native-paper-dates';
import { Provider as PaperProvider } from 'react-native-paper';

import Axios from 'axios';
import URL from '../src/db.js';

import { Colors } from '../stylesGlobal';
import StylesGlobal from '../stylesGlobal';

export default function SignUp({ navigation }) {
    const [Tipo, setTipo] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [openDatePicker, setOpenDatePicker] = useState(false);

    const createUser = async () => {
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return;
        }
        alert('Criando usuário...');

        try {
            const payload = {
                userType: Tipo,
                name: nome,
                email: email,
                tel: telefone,
                cpf_cnpj: cpf,
                password: senha,
                birthday: dataNascimento
            };

            const response = await Axios.post(`${URL}/users`, payload);
            console.log('Usuário criado com sucesso:', response.data);
            navigation.navigate('Profile');
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            alert('Erro ao criar usuário. Veja o console para detalhes.');
        }
    };

    return (
        <PaperProvider>
            <LinearGradient
                colors={[Colors.primaryColor, Colors.gradientColor]}
                style={StylesGlobal.gradientBodyContainer}>
                <ScrollView contentContainerStyle={StylesLogin.container} showsVerticalScrollIndicator={false}>
                    <Text style={StylesLogin.title}>Criar</Text>

                    <Text style={StylesLogin.label}>Tipo de conta:</Text>
                    <Picker
                        style={StylesLogin.picker}
                        selectedValue={Tipo}
                        onValueChange={(itemValue) => setTipo(itemValue)}
                    >
                        <Picker.Item label="Vendedor" value="Vendedor" />
                        <Picker.Item label="Comprador" value="Comprador" />
                    </Picker>

                    <Text style={StylesLogin.label}>Nome:</Text>
                    <TextInput
                        style={StylesLogin.input}
                        placeholder="Nome Sobrenome"
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Text style={StylesLogin.label}>E-mail:</Text>
                    <TextInput
                        style={StylesLogin.input}
                        placeholder="email@dominio.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <Text style={StylesLogin.label}>Telefone:</Text>
                    <TextInput
                        style={StylesLogin.input}
                        placeholder="xx9xxxx-xxxx"
                        value={telefone}
                        onChangeText={setTelefone}
                        keyboardType="phone-pad"
                        maxLength={11}
                    />

                    <Text style={StylesLogin.label}>Data de nascimento:</Text>
                    <TouchableOpacity
                        style={StylesLogin.input}
                        onPress={() => setOpenDatePicker(true)}
                    >
                        <Text style={{ color: dataNascimento ? 'black' : '#999' }}>
                            {dataNascimento || 'Selecione a data'}
                        </Text>
                    </TouchableOpacity>

                    <DatePickerModal
                        mode="single"
                        visible={openDatePicker}
                        onDismiss={() => setOpenDatePicker(false)}
                        date={dataNascimento ? new Date(dataNascimento) : undefined}
                        onConfirm={(params) => {
                            setOpenDatePicker(false);
                            const selectedDate = params.date;
                            const ano = selectedDate.getFullYear();
                            const mes = selectedDate.getMonth().toString();
                            const dia = selectedDate.getDate().toString();
                            setDataNascimento(`${ano}-${mes}-${dia}`);
                        }}
                        saveLabel="Salvar"
                    />

                    <Text style={StylesLogin.label}>CPF/CNPJ:</Text>
                    <TextInput
                        style={StylesLogin.input}
                        placeholder="XXX.XXX.XXX-YY"
                        value={cpf}
                        onChangeText={setCpf}
                        keyboardType="numeric"
                        maxLength={14}
                    />

                    <Text style={StylesLogin.label}>Senha:</Text>
                    <TextInput
                        style={StylesLogin.input}
                        placeholder="******"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                    />

                    <Text style={StylesLogin.label}>Confirmar senha:</Text>
                    <TextInput
                        style={StylesLogin.input}
                        placeholder="******"
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                        secureTextEntry
                    />

                    <TouchableOpacity>
                        <Text style={StylesLogin.loginLink} onPress={() => navigation.goBack()}>Já possui uma conta? Entre aqui!</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={StylesLogin.button} onPress={createUser}>
                        <Text style={StylesLogin.buttonText} >Criar</Text>
                    </TouchableOpacity>
                </ScrollView >
            </LinearGradient >
        </PaperProvider>
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
    },
    picker: {
        borderRadius: 8,
        borderColor: Colors.primaryColor,
        borderWidth: 2,
        padding: 10,
        color: 'black',
        backgroundColor: 'white',
    },
});