import { View } from "react-native";
import Background from "../components/Background";
import styles from "../lib/styles";
import Button from "../components/Button";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "../lib/Api";

export default function MenuScreen({ navigation }) {
    const route = useRoute();
    const { setIsLogged } = route.params;

    function logout() {
        delete Api.defaultHeaders.Authorization;
        setIsLogged(false);
        AsyncStorage.setItem('Authorization', '');
    }

    return (
        <Background>
            <View style={styles.container}>
                <Button
                onPress={() => navigation.navigate('Users')}
                >
                    Usuarios
                </Button>
                <Button
                    onPress={logout}
                    >
                    Salir
                </Button>
            </View>
        </Background>
    );
}