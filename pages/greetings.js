import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import StylesGlobal, { Colors } from '../stylesGlobal';

export default function Greetings({ navigation }) {
    if (localStorage.getItem('token')) {
        navigation.replace('MainTabs');
    }
    return (
        <View style={StylesGlobal.bodyContainer}>
            <View style={[StylesGlobal.mainContainer, styles.container]}>
                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.subtitle}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
                <View style={styles.iconContainer}>
                    <Image
                        source={require('../assets/images/greetings.svg')}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.exploreText}>Comece a explorar!</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.replace('MainTabs')}>
                    <Text style={styles.buttonText}>Explorar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: Colors.primaryColor,
        marginTop: 32,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
        marginBottom: 24,
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
    },
    icon: {
        width: 140,
        height: 140,
    },
    exploreText: {
        color: Colors.primaryColor,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 32,
        textAlign: 'center',
    },
    button: {
        backgroundColor: Colors.primaryColor,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 64,
        marginBottom: 24,
        alignSelf: 'stretch',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
});