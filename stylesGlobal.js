import { StyleSheet } from 'react-native';

// Variables for Colors Palette
export const Colors = {
    primaryColor: '#7C37F4',
    bgColor: '#dbdbdb',
    dImgColor: '#d9c3ff',
    alertColor: '#d32626',
    gradientColor: '#A11D86',
};

const StylesGlobal = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        backgroundColor: Colors.bgColor,
        padding: 16,
    },
    gradientBodyContainer: {
        flex: 1,
        backgroundColor: Colors.bgColor,
        padding: 16,
    },
    mainContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 4,
        height: 54,
        padding: 8,
        borderColor: Colors.primaryColor,
        backgroundColor: 'white',
        marginBottom: 8
    },
    navInput: {
        flex: 1,
        margin: 8,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 16,
        padding: 8,
        width: '100%',
        height: 54,
    },
    leftheader: {
        width: '50%',
        alignItems: 'flex-start',
    },
    rightheader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        justifyContent: 'flex-end',
    },
    headerTitle:
    {
        color: Colors.primaryColor,
        fontWeight: 'bold',
        marginHorizontal: 8,
        fontSize: 16,
    },
    backButton: {
        padding: 4,
        width: 64,
    },
    backIcon: {
        width: 28,
        height: 28,
        tintColor: Colors.primaryColor,
        resizeMode: 'contain',
    },
    addAd: {
        width: '100%',
        backgroundColor: Colors.primaryColor,
        borderRadius: 8,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        alignItems: 'center'
    },
    adInput: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    loadingText: {
        color: Colors.primaryColor,
        fontWeight: 'bold',
        fontSize: 28,
        margin: 'auto',
        backgroundColor: 'white',
        padding: 48,
        borderRadius: 8,


    },
});

export default StylesGlobal;