import React, { useState } from 'react';
import { TouchableOpacity, Text, Image, Alert, View } from 'react-native';
import { ChampionData } from '../interface/championData';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ScaledSheet } from 'react-native-size-matters';

type CardProps = {
  champion: ChampionData;
  onDelete: () => void;
};

const Card = ({ champion, onDelete }: CardProps) => {
  const navigation: NavigationProp<Record<string, unknown>> = useNavigation();
  const { id } = champion;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleImagePress = () => {
    navigation.navigate('Skin', { championId: id });
  };

  const handleLongPress = () => {
    setIsDeleting(true);
  };

  const handleDelete = () => {
    setIsDeleting(false);
    onDelete();
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar este campeón?',
      [
        { text: 'Cancelar', onPress: handleCancelDelete },
        { text: 'Eliminar', onPress: handleDelete },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={handleLongPress}
    >
      <TouchableOpacity onPress={handleImagePress}>
        <Image
          source={{ uri: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg` }}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.name}>{champion.name}</Text>
      <Text style={styles.title}>{champion.title}</Text>
      <Text style={styles.blurb}>{champion.blurb}</Text>

      {isDeleting ? (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleCancelDelete} style={styles.cancelButton}>
            <Text style={styles.buttonTextCancel}>CANCELAR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmDelete} style={styles.deleteButton}>
            <Text style={styles.buttonTextDelete}>ELIMINAR</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginVertical: '10@s',
    marginHorizontal: '8@s',
    backgroundColor: '#201c1c',
    padding: '10@s',
    borderRadius: '10@s',
  },
  image: {
    width: '100%',
    height: '200@s',
    borderRadius: '10@s',
  },
  name: {
    color: 'white',
    marginTop: '10@s',
    marginBottom: '10@s',
    fontSize: '16@s',
    fontWeight: 'bold',
  },
  title: {
    color: 'white',
    marginBottom: '10@s',
    fontSize: '14@s',
  },
  blurb: {
    color: 'white',
    marginBottom: '20@s',
    fontSize: '14@s',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10@s',
  },
  cancelButton: {
    backgroundColor: '#363435',
    borderRadius: '10@s',
    paddingHorizontal: '35@s',
    paddingVertical: '10@s',
  },
  deleteButton: {
    backgroundColor: '#f9f9f9',
    borderRadius: '10@s',
    paddingHorizontal: '35@s',
    paddingVertical: '10@s',
    color: "#0000",
  },
  buttonTextCancel: {
    fontWeight: 'bold',
    fontSize: '12@s',
    color: 'white',
  },
  buttonTextDelete: {
    fontWeight: 'bold',
    fontSize: '12@s',
    color: 'black',
  },
});

export default Card;