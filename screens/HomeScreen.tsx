import React, { useRef } from 'react';
import { View, Button, StyleSheet, Image, Pressable, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interface/RootStackPrams';
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";
import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();


function HomeScreen({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) {
    const video = React.useRef<Video | null>(null);
    React.useEffect(() => {
        if (video.current && typeof video.current.playAsync === 'function') {
            video.current.playAsync();
        }
    }, [video]);

    return (
        <>
            <View style={styles.container}>
                <Video
                    ref={video}
                    style={styles.video}
                    source={require("../assets/videos/HomeVideo.webm")} // Utiliza require para cargar el archivo de video
                    isLooping={true}
                    resizeMode={ResizeMode.COVER} />
            </View>
            <Image
                source={require('../assets/Images/logo.png')}
                style={{
                    width: "auto", height: 170, marginTop: 70
                }}
            />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Pressable android_ripple={{ color: "white" }} style={styles.button} onPress={() => navigation.navigate('Champions')}>
                    <Text style={styles.text}>Comenzar Ahora</Text>
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        resizeMode: "cover",
        position: "absolute",
        flexDirection: "column",
    },
    video: {
        alignSelf: "center",
        width: "100%",
        height: "100%",
    },
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
    containerSub: {
        flex: 1,
        backgroundColor: "rgba(52, 52, 52, 0.7)",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 40,
    },

    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    inputView: {
        backgroundColor: "white",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
        backgroundColor: "rgba(52, 52, 52, 0.1)",
        textAlign: "center",
        color: "yellow",
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "white",
    },
});


export default HomeScreen