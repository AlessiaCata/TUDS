import '@expo/metro-runtime';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createNavigationContainerRef } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import UsersScreen from './screens/UsersScreen';
import MenuScreen from './screens/MenuScreen';
import UserScreen from './screens/UserScreen';
import { Pressable, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Api } from './lib/Api';

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

export default function App() {
  const [isLogged, setIsLogged] = useState(false);

  const headerRight = ()  => (
    <Pressable
      onPress = {() => navigationRef.navigate('Menu')}
      title="Info"
      color="#fff"
    >
      <Text>Menu</Text>
    </Pressable>
  );

  useEffect(() => {
    AsyncStorage.getItem('Authorization')
      .then(auth => {
        if (auth) {
          Api.defaultHeaders.Authorization = auth;
          setIsLogged(true);
        }
      })
      .catch(() =>{});
  }, []);


  if (!isLogged){
    return (
      <View><LoginScreen setIsLogged={setIsLogged}/></View>
    );   
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuScreen} initialParams={{setIsLogged}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Ingresar', headerRight}} />
        <Stack.Screen name="Users" component={UsersScreen} options={{title: 'Usuarios', headerRight}} />
        <Stack.Screen name="User" component={UserScreen} options={{title: 'Usuario', headerRight}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
