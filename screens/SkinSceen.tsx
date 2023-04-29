import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../interface/RootStackPrams';

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
        let skins = [];
        let i = 0;
        while (i < 30) { // maximum number of skins to fetch
          const skinUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_${i}.jpg`;
          const skinResponse = await fetch(skinUrl);
          if (skinResponse.status === 200) {
            skins.push(skinUrl);
          }
          i++;
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
  },
  skinImage: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
});

export default SkinScreen;
