import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../interface/RootStackPrams';
import championSkins from '../JSON/championSkins.json';
import { ChampionSkins } from '../interface/championSkin';

type SkinScreenParams = {
  championId: string;
};

const SkinScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Skin'> & { params: SkinScreenParams }>();
  const championId = route.params?.championId as string;
  const [skinImages, setSkinImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchSkins = async () => {
      try {
        const skins: string[] = [];
        const championSkinNumbers: number[] = (championSkins as ChampionSkins)[championId];
        if (championSkinNumbers) {
          for (const skinNumber of championSkinNumbers) {
            const skinUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_${skinNumber}.jpg`;
            const skinResponse = await fetch(skinUrl);
            if (skinResponse.status === 200) {
              skins.push(skinUrl);
            }
          }
        }
        setSkinImages(skins);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSkins();
  }, [championId]);

  const renderSkin = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.skinImage} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={skinImages}
        renderItem={renderSkin}
        keyExtractor={(item, index) => `skin_${index}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#18141c",
  },
  skinImage: {
    width: 350,
    height: 600,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default SkinScreen;
