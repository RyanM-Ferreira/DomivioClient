import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet } from 'react-native';

import { Colors } from './stylesGlobal';

// Pages
import Home from './pages/home';
import Saved from './pages/saved';
import Chat from './pages/chat';
import Settings from './pages/settings';
import Profile from './pages/profile';
import Advertisement from './pages/advertisement';
import AdvertisementAdd from './pages/advertisementadd';
import Login from './pages/login';
import SignUp from './pages/signup';
import Greetings from './pages/greetings';
import ChatIn from './pages/chatIn';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: styles.tabBarStyle, }}>
      <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: () => (<Image style={styles.tabBarIconStyle} source={require('./assets/icons/normal/homeIcon.svg')} />), }} />
      <Tab.Screen name="Saved" component={Saved} options={{ tabBarIcon: () => (<Image style={styles.tabBarIconStyle} source={require('./assets/icons/normal/savedIcon.svg')} />), }} />
      <Tab.Screen name="Chat" component={Chat} options={{ tabBarIcon: () => (<Image style={styles.tabBarIconStyle} source={require('./assets/icons/normal/contactIcon.svg')} />), }} />
      <Tab.Screen name="Settings" component={Settings} options={{ tabBarIcon: () => (<Image style={styles.tabBarIconStyle} source={require('./assets/icons/normal/settingsIcon.svg')} />), }} />
      <Tab.Screen name="Login" component={Login} options={{ tabBarIcon: () => (<Image style={styles.tabBarIconStyle} source={require('./assets/icons/normal/personIcon.svg')} />), }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Greetings" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Advertisement" component={Advertisement} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Greetings" component={Greetings} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="ChatIn" component={ChatIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Saved" component={Saved} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="AdvertisementAdd" component={AdvertisementAdd} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    height: 54,
    padding: 8,
    paddingTop: 4,
    borderColor: Colors.primaryColor,
    borderWidth: 4,
  },
  tabBarIconStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});