import { StyleSheet, View, SafeAreaView, FlatList, TouchableHighlight, Text, Dimensions, TextInput, } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import PlayerProperties from '@/components/PlayerProperties';
import { router } from 'expo-router';
import SessionStorage from 'react-native-session-storage';


export default function SettingsScreen() {

    const { gamemodeName } = useLocalSearchParams();
    const [playersList, setPlayersList] = useState([{ name: "", team: "" }])

    const removePlayer = (index: number) => {
        const newPlayersList = [...playersList]
        newPlayersList.splice(index, 1);
        setPlayersList(newPlayersList);
    }

    const addPlayer = () => {
        const newPlayersList = [...playersList]
        newPlayersList.push({ name: "", team: "" })
        setPlayersList(newPlayersList)
    }

    const renderAddButton = () => {
        return <View style={styles.addContainer}><TouchableHighlight style={styles.buttonAdd} onPress={() => addPlayer()}><Entypo name="add-user" size={40} color="white" /></TouchableHighlight></View>
    }

    const playGame = () => {
        const teams = new Map<string, [string[], number]>()
        const scores = new Array<number>();
        const doors = new Array<number[]>();
        const names = new Array<string>();
        const cricketValues = [15, 16, 17, 18, 19, 20, 25];
        let biggestTeam = 0;
        playersList.forEach(player => {
            teams.has(player.team) ? teams.get(player.team)?.[0].push(player.name) : teams.set(player.team, [[player.name], 0])
            const teamSize = teams.get(player.team)?.[0].length
            teamSize != undefined && teamSize > biggestTeam ? biggestTeam = teamSize : biggestTeam;
            gamemodeName === '301' ? scores.push(301) : scores.push(0);

            doors.push(Array(cricketValues.length).fill(0))
            names.push(player.name)
        })
        const playOrder = new Array<string>()
        for (let index = 0; index < biggestTeam; index++) {
            teams.forEach(([names, namesIndex], key, map) => {
                playOrder.push(names[namesIndex])
                namesIndex = (namesIndex + 1) % names.length
                teams.set(key, [names, namesIndex])
            })
        }
        SessionStorage.setItem("scores", JSON.stringify(scores))
        SessionStorage.setItem("doors", JSON.stringify(doors))
        SessionStorage.setItem("names", JSON.stringify(names))
        router.back()
        router.replace({ pathname: '/current-game', params: { playOrder: playOrder, cricketValues: cricketValues, gamemodeName: gamemodeName } })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>
                    {gamemodeName}
                </Text>

            </View>
            <FlatList data={playersList} contentContainerStyle={{ paddingBottom: windowHeight }} ListFooterComponent={renderAddButton()} renderItem={({ item, index }) => {
                return <PlayerProperties name={item.name} team={item.team} index={index} removePlayer={removePlayer} onChange={(name: string, team: string | null, index: number) => {
                    const newPlayersList = [...playersList]
                    newPlayersList[index].name = name
                    newPlayersList[index].team = team != null ? team : ""
                    setPlayersList(newPlayersList)
                }} ></PlayerProperties>
            }
            } />
            <View style={styles.playButtonContainer}>
                <TouchableHighlight style={styles.playButton} onPress={() => { playGame() }}>
                    <Text style={styles.playText}>Play</Text>
                </TouchableHighlight>
            </View>

        </SafeAreaView >
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    title: {
        paddingVertical: windowHeight * 0.03,
        alignItems: 'center',
        backgroundColor: 'rgb(15,15,15)'
    },
    titleText: {
        color: 'white',
        fontSize: 40,

    },
    container: {
        height: windowHeight,
    },
    playerContainer: {
        flexDirection: 'row',
        width: windowWidth,
    },
    removePlayerButton: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonAdd: {
        width: windowWidth * 0.3,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgb(15,15,15)',
        marginTop: 10
    },
    AddText: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
    },
    inputName: {
        marginLeft: 10,
        marginVertical: 10,
        color: 'white',
        fontSize: 40,
        width: '60%',
    },
    addContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownStyle: {
        width: '30%',
        margin: 0,
    },
    playButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        paddingHorizontal: windowHeight * 0.03,
        borderRadius: 20,
    },
    playText: {
        color: 'white',
        fontSize: 50,
        textAlign: 'center',
    },
    playButtonContainer: {
        position: 'absolute',
        bottom: 150,
        alignSelf: 'center'
    }

});
