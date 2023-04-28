import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const SkinScreen = () => {
    const route = useRoute();
    const championId = route.params?.championId as string;
    const [skinImages, setSkinImages] = useState([]);

    useEffect(() => {
        const fetchSkins = async () => {
            try {
                const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_0.jpg`);
                // Obtener el número de skins que tiene el campeón
                const numSkins = response.status === 200 ? 1 : 0;
                let skins = [];
                // Comenzar desde el skin 1 y buscar imágenes hasta que se alcance un error 404
                for (let i = 1; i <= numSkins; i++) {
                    const skinUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_${i}.jpg`;
                    const skinResponse = await fetch(skinUrl);
                    if (skinResponse.status === 200) {
                        skins.push(skinUrl);
                    } else {
                        break;
                    }
                }
                setSkinImages(skins);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSkins();
    }, [championId]);

    return (
        <View style={styles.container}>
            {skinImages.map((skin, index) => (
                <Image
                    key={index}
                    source={{ uri: skin }}
                    style={styles.skinImage}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    skinImage: {
        width: 200,
        height: 350,
        resizeMode: 'contain',
        marginVertical: 20,
    },
});

export default SkinScreen;
