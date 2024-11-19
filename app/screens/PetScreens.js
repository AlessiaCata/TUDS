import { View, Text, Image } from "react-native-web";
import Background from "../components/Background";
import styles from "../lib/styles";
import { useState, useEffect } from "react";
import { Api } from "../lib/Api";

export default function PetScreen({ route }) {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');

    useEffect(() => {
        loadPet();
    }, []);

    async function loadPet() {
        try {
            const res = await Api.get('pet', { search: { id: route.params.id } }); 
            const data = await res.json();
            if (!data?.length) {
                return;
            }

            const pet = data[0];
            setNombre(pet.nombre ?? '');
            setDescripcion(pet.descripcion ?? '');
            setImagen(pet.imagen ?? '');
        } catch (error) {
            console.error("Error al cargar los detalles de la mascota:", error);
        }
    }

    return (
        <Background>
            <View style={styles.container}>
                <Text style={styles.title}>Detalles de la Mascota</Text>
                {imagen && <Image source={{ uri: imagen }} style={{ width: 200, height: 200, marginBottom: 20 }} />}
                <Text>Nombre: {nombre}</Text>
                <Text>Descripción: {descripcion}</Text>
            </View>
        </Background>
    );
}
