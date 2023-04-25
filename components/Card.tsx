import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { ChampionData } from '../interface/championData';

// Componente Card para mostrar los detalles de cada campeón
const Card = ({ champion }: { champion: ChampionData }) => (
    <View style={{ margin: 10, backgroundColor: '#201c1c', padding: 10, borderRadius: 10 }}>
      {/* Agregar la imagen del campeón */}
      <Image
        source={{ uri: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg` }}
        style={{
          width: "auto", height: 200, borderRadius: 10
        }}
      />
      <Text style={{ color: "white", marginTop: 10, marginBottom: 10 }}>{champion.name}</Text>
      <Text style={{ color: "white", marginBottom: 10 }}>{champion.title}</Text>
      <Text style={{ color: "white", marginBottom: 10 }}>{champion.blurb}</Text>
      {/* Puedes agregar más propiedades de ChampionData aquí */}
    </View>
);

export default Card;
