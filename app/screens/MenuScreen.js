import { View, StyleSheet } from "react-native";
import Background from "../components/Background";
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
            <View style={styles.menuContainer}>
                <Button
                    onPress={() => navigation.navigate('Users')}
                    style={styles.menuButton}
                >
                    Usuarios
                </Button>
                <Button
                    onPress={() => navigation.navigate('Pets')}  // Actualizamos aquí
                    style={styles.menuButton}
                >
                    Mascotas
                </Button>
                <Button
                    onPress={logout}
                    style={styles.logoutButton}
                >
                    Salir
                </Button>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    menuButton: {
        backgroundColor: "#007BFF",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginVertical: 10,
        width: "80%",
        alignItems: "center",
    },
    logoutButton: {
        backgroundColor: "#DC3545",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginVertical: 10,
        width: "80%",
        alignItems: "center",
    },
});
