import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Pressable, StyleSheet } from 'react-native';
import { fetchChampions } from '../services/championGet'; // Importar la función fetchChampions y la interfaz ChampionData
import { ChampionData } from '../interface/championData';
import Card from "../components/Card"; // Importar el componente Card

const ChampionsScreen = () => {
    const [champions, setChampions] = useState<{ [key: string]: ChampionData }>({}); // Estado para almacenar los datos de los campeones
    const [loadedChampions, setLoadedChampions] = useState<ChampionData[]>([]); // Estado para mantener los campeones cargados
    const [loadMore, setLoadMore] = useState<boolean>(true); // Estado para habilitar/deshabilitar el botón de cargar más

    useEffect(() => {
        // Función asincrónica para obtener los datos de los campeones
        const fetchData = async () => {
            try {
                const championsData = await fetchChampions(); // Llamar a la función fetchChampions para obtener los datos
                setChampions(championsData); // Actualizar el estado champions con los datos obtenidos
                setLoadedChampions(Object.values(championsData).slice(0, 5)); // Cargar los primeros 5 campeones en el estado loadedChampions
            } catch (error) {
                console.error(error); // Manejar cualquier error y mostrarlo en la consola
            }
        };
        fetchData(); // Llamar a fetchData al montar el componente (arreglo de dependencias vacío)
    }, []);

    // Función para cargar más campeones
    const handleLoadMore = () => {
        const remainingChampions = Object.values(champions).slice(loadedChampions.length, loadedChampions.length + 5); // Obtener los siguientes 5 campeones a partir del estado champions
        setLoadedChampions([...loadedChampions, ...remainingChampions]); // Agregar los campeones cargados al estado loadedChampions
        setLoadMore(remainingChampions.length === 5); // Habilitar/deshabilitar el botón de cargar más según si hay más campeones para cargar
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#18141c", paddingLeft: 20, paddingRight: 20, paddingTop: 25 }}>
            <FlatList
                data={loadedChampions} // Pasar los campeones cargados como datos para la FlatList
                renderItem={({ item }) => <Card champion={item} />} // Utilizar el componente Card para renderizar cada campeón
                keyExtractor={(item: ChampionData) => item.key} // Utilizar la propiedad "key" de cada campeón como identificador único
            />
            <View style={{ alignItems: 'center' }}>
                <Pressable android_ripple={{ color: "white" }} style={styles.button} onPress={handleLoadMore}>
                    <Text style={styles.text}>Cargar Mas</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 15,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 6.5,
        elevation: 3,
        backgroundColor: '#2b2a29',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default ChampionsScreen;
