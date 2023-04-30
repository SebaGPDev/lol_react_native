import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Loader() {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../JSON/loader3.json')}
                autoPlay
                loop
                style={styles.video}
            />
            <ActivityIndicator size="large" color="white" style={styles.activityIndicator} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        resizeMode: 'cover',
        position: 'absolute',
        flexDirection: 'column',
    },
    video: {
        right: '37%',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    activityIndicator: {
        position: 'absolute',
        alignSelf: 'center',
        top: '50%',
    },
});
