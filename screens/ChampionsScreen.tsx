import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchChampions } from '../services/championGet';
import { ChampionData } from '../interface/championData';
import Card from '../components/Card';
import { Feather } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';

const ChampionsScreen = () => {
    const [champions, setChampions] = useState<{ [key: string]: ChampionData }>({});
    const [loadedChampions, setLoadedChampions] = useState<ChampionData[]>([]);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: searchVisible ? null : 'Champions',
            headerRight: () => (
                <TouchableOpacity onPress={() => setSearchVisible(true)} style={styles.headerButton}>
                    <Feather name="search" size={moderateScale(24)} color="white" />
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#18141c',
            },
            headerTintColor: '#FFFFFF',
        });
    }, [navigation, searchVisible]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const championsData = await fetchChampions();
                const filteredChampions = Object.values(championsData).filter((champion) => {
                    const championName = champion.name.toLowerCase();
                    return championName.includes(searchTerm.toLowerCase());
                });

                setChampions(championsData);
                setLoadedChampions(filteredChampions);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [searchTerm]);

    const handleDeleteChampion = (championId: string) => {
        const updatedChampions = { ...champions };
        delete updatedChampions[championId];
        setChampions(updatedChampions);

        const updatedLoadedChampions = loadedChampions.filter((champion) => champion.key !== championId);
        setLoadedChampions(updatedLoadedChampions);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#18141c" />

            {searchVisible && (
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <TouchableOpacity onPress={() => setSearchVisible(false)} style={styles.cancelButton}>
                            <Feather name="arrow-left" size={moderateScale(24)} color="white" />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar campeones"
                            placeholderTextColor="#FFFFFF"
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                        />
                    </View>
                </View>
            )}

            <FlatList
                data={loadedChampions}
                renderItem={({ item }) => <Card champion={item} onDelete={() => handleDeleteChampion(item.key)} />}
                keyExtractor={(item: ChampionData) => item.key}
                contentContainerStyle={styles.flatListContent}
                ListHeaderComponent={() => <View style={styles.listHeader} />}
                ListFooterComponent={() => <View style={styles.listFooter} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#18141c',
    },
    headerButton: {
        marginRight: moderateScale(10),
    },
    searchContainer: {
        marginBottom: moderateScale(1),
        paddingHorizontal: moderateScale(16),
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: moderateScale(1),
        backgroundColor: '#18141c',
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateScale(10),
    },
    cancelButton: {
        paddingHorizontal: moderateScale(10),
    },
    searchInput: {
        flex: 1,
        color: 'white',
        fontSize: moderateScale(16),
        paddingVertical: moderateScale(8),
        marginLeft: moderateScale(10),
    },
    flatListContent: {
        paddingVertical: moderateScale(1),
        paddingHorizontal: moderateScale(16),
    },
    listHeader: {
        height: moderateScale(6),
    },
    listFooter: {
        height: moderateScale(6),
    },
});

export default ChampionsScreen;
