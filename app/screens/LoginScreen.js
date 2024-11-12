import { useState } from 'react';
import { Text, View } from 'react-native';
import Background from '../components/Background';
import styles from '../lib/styles';
import Button from '../components/Button';
import TextField from '../components/TextField';
import FormTitle from '../components/FormTitle';
import { Api } from '../lib/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({setIsLogged }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [roles, setRoles] = useState([]);

  function login() {
    const body = {
      username,
      password,
    };
        
    Api.post('login', { body, autoCheck: false })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          console.error(json.message);
          setError(json.message);
        } else if (json.authorizationToken){     

          const auth = 'Bearer ' + json.authorizationToken;
          Api.defaultHeaders.authorization = auth;
          setIsLogged(true);

          AsyncStorage.setItem('Authorization', auth);

        }
      })
      .catch(e => {
        if (e.message) {
          console.error(e.message); 
          setError(e.message);
        } else {
          console.error(String(e));
          setError(String(e));
        }
      });
  }

  return (
    <Background>
      <View style={styles.container}>
        <FormTitle>Iniciar sesión</FormTitle>
        <TextField
          label= "Usuario"
          value={username}
          onChangeText={setUsername}
        />
        <TextField
          label= "Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Button onPress={login}>Iniciar sesión</Button>
      </View>
    </Background>
  );
}
