import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Pressable, StyleSheet } from 'react-native';
import { fetchChampions } from '../services/championGet'; // Importar la función fetchChampions y la interfaz ChampionData
import { ChampionData } from '../interface/championData';
import Card from "../components/Card"; // Importar el componente Card

const ChampionsScreen = () => {
    const [champions, setChampions] = useState<{ [key: string]: ChampionData }>({});
    const [loadedChampions, setLoadedChampions] = useState<ChampionData[]>([]); // Estado para mantener los campeones cargados
    const [loadMore, setLoadMore] = useState<boolean>(true); // Estado para habilitar/deshabilitar el botón de cargar más

    useEffect(() => {
        const fetchData = async () => {
            try {
                const championsData = await fetchChampions();
                setChampions(championsData);
                setLoadedChampions(Object.values(championsData).slice(0, 5)); // Cargar los primeros 5 campeones
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    // Función para cargar más campeones
    const handleLoadMore = () => {
        const remainingChampions = Object.values(champions).slice(loadedChampions.length, loadedChampions.length + 5); // Obtener los siguientes 5 campeones
        setLoadedChampions([...loadedChampions, ...remainingChampions]); // Agregar los campeones cargados al estado
        setLoadMore(remainingChampions.length === 5); // Habilitar/deshabilitar el botón de cargar más según si hay más campeones para cargar
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#18141c", paddingLeft: 20, paddingRight: 20, paddingTop: 25 }}>
            <FlatList
                data={loadedChampions}
                renderItem={({ item }) => <Card champion={item} />} // Utilizar el componente Card para renderizar cada campeón
                keyExtractor={(item: ChampionData) => item.key}
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
