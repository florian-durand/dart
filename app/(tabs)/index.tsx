import { Image, StyleSheet, Platform, View, Button, StatusBar, SafeAreaView, FlatList, TouchableHighlight, Text, Dimensions, ImageBackground, Pressable } from 'react-native';
import { Link, router } from 'expo-router';

export default function DartScreen() {

    const gamemodes = [{ name: '301', image: require('../../assets/images/301.avif') }, { name: 'Cricket', image: require('../../assets/images/cricket.jpg') }];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>
                    Game modes
                </Text>
            </View>
            <FlatList data={gamemodes} renderItem={({ item }) => (
                <TouchableHighlight onPress={() => { router.navigate({ pathname: "/settings", params: { gamemodeName: item.name } }); }}>
                    <ImageBackground resizeMode='cover' style={styles.button} imageStyle={styles.image} source={item.image}>
                        <Text style={styles.buttonText}>{item.name}</Text>
                    </ImageBackground>
                </TouchableHighlight>
            )} />
        </SafeAreaView>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    title: {
        paddingVertical: windowHeight * 0.03,
        alignItems: 'center',
    },
    titleText: {
        color: 'white',
        fontSize: 40,

    },
    container: {
        height: windowHeight,
    },
    button: {
        borderRadius: windowHeight * 0.02,
        alignItems: 'center',
        paddingVertical: windowHeight * 0.05,
        marginHorizontal: windowWidth * 0.05,
        marginVertical: windowHeight * 0.01,
    }
    ,
    buttonText: {
        fontSize: 40,
        color: 'white',
        textShadowColor: 'black',
        textShadowRadius: 10,
        textShadowOffset: { width: -1, height: 1 },
    },
    image: {
        borderRadius: windowHeight * 0.02,
    },

});
