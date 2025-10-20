import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import StylesGlobal from '../stylesGlobal';
import { Colors } from './../stylesGlobal';
import URL from '../src/db.js';
import Axios from 'axios';

export default function Home({ navigation }) {
    const [user, setUser] = useState(null);
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigation.replace('Login');
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch user data
                const userResponse = await Axios.get(`${URL}/users/${localStorage.getItem('token')}`);
                setUser(userResponse.data);

                // Fetch ads
                const adsResponse = await Axios.get(`${URL}/ads`);
                console.log('Ads data:', adsResponse.data);
                setAds(adsResponse.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Erro ao carregar dados');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={StylesGlobal.bodyContainer}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    if (!user) {
        return (
            <View style={StylesGlobal.bodyContainer}>
                <Text>Erro ao carregar usuário</Text>
            </View>
        );
    }

    return (
        <ScrollView style={StylesGlobal.bodyContainer} showsHorizontalScrollIndicator={false}>
            {user.userType === "comprador" ? (
                <View style={StylesGlobal.navBar}>
                    <TextInput
                        placeholder="Pelo o que está buscando?"
                        style={StylesGlobal.navInput}
                    />
                    <TouchableOpacity>
                        <Image style={StylesGlobal.icon} source={require('../assets/icons/normal/loupIcon.svg')} />
                    </TouchableOpacity>
                </View>
            ) : user.userType === "Vendedor" ? (
                <View style={StylesGlobal.navBar}>
                    <Text style={StylesGlobal.navInput}>Adicionar Anúncio</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AdvertisementAdd')}>
                        <Image style={StylesGlobal.icon} source={require('../assets/icons/normal/plus.svg')} />
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <Text>Tipo de usuário desconhecido.</Text>
                </View>
            )}

            {ads.map((ad, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate('Advertisement', { ad })}>
                    <View style={StylesGlobal.mainContainer}>
                        <View style={styles.header}>
                            <View style={styles.profileIcon}>
                                <Image style={styles.icon} source={require('../assets/icons/alt/personIcon.svg')} />
                            </View>
                            <Text style={styles.sellerText}>
                                {ad.User?.name || 'Nome não disponível'}
                            </Text>
                        </View>

                        <View style={styles.imageView} />

                        <View style={styles.detailsRow}>
                            <Text style={styles.price}>{ad.price || 'Preço não disponível'}</Text>
                            <View style={styles.infoSection}>
                                <Text style={styles.typeFor}>Disponível para COMPRA em</Text>
                                <Text style={styles.locationTitle}>{ad.location || 'Local não disponível'}</Text>
                            </View>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.detail}>
                                <Text style={styles.detailAccent}>Área: </Text>
                                {ad.size || 'N/A'}
                            </Text>
                            <Text style={styles.detail}>
                                <Text style={styles.detailAccent}>Qt. Cômodos: </Text>
                                {ad.rooms || 'N/A'}
                            </Text>
                            <Text style={styles.detail}>
                                <Text style={styles.detailAccent}>Banheiros: </Text>
                                {ad.bathrooms || 'N/A'}
                            </Text>
                            <Text style={styles.detail}>
                                <Text style={styles.detailAccent}>Vagas na Garagem: </Text>
                                {ad.garage || 'N/A'}
                            </Text>
                        </View>

                        <View style={styles.buttonsView}>
                            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Saved')}>
                                <Image style={styles.icon} source={require('../assets/icons/alt/savedIcon.svg')} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.textButton} onPress={() => navigation.navigate('Chat')}>
                                <Text style={styles.buttonText}>Contato</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.iconButton}>
                                <Image style={styles.icon} source={require('../assets/icons/alt/rightArrow.svg')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    profileIcon: {
        backgroundColor: Colors.primaryColor,
        borderRadius: 8,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sellerText: {
        marginLeft: 8,
        color: Colors.primaryColor,
        fontSize: 16,
        fontWeight: '500',
    },
    imageView: {
        backgroundColor: Colors.dImgColor,
        height: 140,
        borderRadius: 8,
        marginBottom: 12,
        width: '100%',
    },
    infoSection: {
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primaryColor,
        marginBottom: 4,
    },
    typeFor: {
        fontSize: 13,
        color: 'black',
    },
    locationTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.primaryColor,
    },
    detailsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    detail: {
        fontSize: 12,
        marginBottom: 4,
    },
    detailAccent: {
        fontSize: 12,
        color: Colors.primaryColor,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    buttonsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    iconButton: {
        backgroundColor: Colors.primaryColor,
        height: 48,
        width: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        flex: 1,
        backgroundColor: Colors.primaryColor,
        marginHorizontal: 12,
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
