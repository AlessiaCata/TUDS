import { FlatList, View, Text, Image } from "react-native-web";
import Background from "../components/Background";
import styles from "../lib/styles";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { Api } from "../lib/Api";

export default function PetsScreen({ navigation }) {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        loadPets();
    }, []);

    async function loadPets() {
        try {
            const res = await Api.get('pet'); 
            const data = await res.json();
            if (data?.length) {
                setPets(data);
            }
        } catch (error) {
            console.error("Error al cargar las mascotas:", error);
        }
    }

    function viewPet(id) {
        navigation.navigate('Pet', { id });
    }

    return (
        <Background>
            <View style={styles.container}>
                <FlatList
                    style={{ width: '100%' }}
                    data={pets}
                    keyExtractor={(item) => item.uuid}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Image 
                                source={{ uri: item.imagen }} 
                                style={{ width: 100, height: 100, marginBottom: 10 }}
                            />
                            <Text>Nombre: {item.nombre}</Text>
                            <Text>Descripción: {item.descripcion}</Text>
                            <Button onPress={() => viewPet(item.id)}>Ver</Button>
                        </View>
                    )}
                />
            </View>
        </Background>
    );
}
