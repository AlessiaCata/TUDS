import { FlatList, View, Text } from "react-native-web";
import Background from "../components/Background";
import styles from "../lib/styles";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { Api } from "../lib/Api";

export default function UsersScreen({ navigation }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
            const res = await Api.get('user');
            const data = await res.json();
            if (data?.length) {
                setUsers(data);
            }
        }

    function viewUser(uuid) {
        navigation.navigate('User', { uuid });
    }

    return (
        <Background>
            <View style={styles.container}>
                <FlatList
                    style={{ width: '100%' }}
                    data={users}
                    keyExtractor={(item) => item.uuid.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text>Usuario: {item.username}</Text>
                            <Text>Nombre: {item.displayName}</Text>
                            <Button onPress={() => viewUser(item.uuid)}>Ver</Button>
                        </View>
                    )}
                />
            </View>
        </Background>
    );
}

/*try {
    setUsers([
        {
            uuid: 1,
            username: 'Admin',
            displayName: 'Administrador',
        },
        {
            uuid: 2,
            username: 'Otro',
            displayName: 'No es Administrador',
        },
    ]); */