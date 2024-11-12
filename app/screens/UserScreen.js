import { View } from "react-native-web";
import Background from "../components/Background";
import styles from "../lib/styles";
import { useState, useEffect } from "react";
import { Api } from "../lib/Api";
import FormTitle from "../components/FormTitle";
import TextField from "../components/TextField";


export default function UserScreen({route}) {
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [isEnabled, setIsEnabled] = useState(true);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
            const res = await Api.get(
                'user',
                {search: {uuid: route.params.uuid}}
            );
            const data = await res.json();
            if (!data?.length) {
                return;
            }

            const user = data[0];

             setUsername(user.username ?? '');
             setDisplayName(user.displayName ?? '');
             setIsEnabled(user.isEnabled ?? false);
             setRoles(user.roles);
        }

    return (
        <Background>
            <View style={{  ... styles.container}}>
                <FormTitle>Editar un Usuario</FormTitle>
                <TextField label="Usuario" value={username} />
                <TextField label="Nombre" value={displayName} />
                <TextField label="Habilitado" value={isEnabled? 'Si' : 'No'} />
                <TextField label="Roles" value={roles}/>
            </View>
        </Background>
    );
}