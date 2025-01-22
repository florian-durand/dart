import { useState } from "react";
import { View, StyleSheet, TouchableHighlight, Text, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function KeyboardCricket(props: { values: number[], onAddValue: (value: string) => void }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState(0)

    const renderButton = (v: number) => {
        return <TouchableHighlight key={v} style={styles.button} onPress={() => { setValue(v); v != 0 ? setModalVisible(true) : props.onAddValue("0"); }}>
            <Text style={styles.buttonText}>
                {v}
            </Text>
        </TouchableHighlight>
    }

    function chunkArrayInGroups(arr: number[], size: number) {
        const result = []
        let temp = []

        for (let a = 0; a < arr.length; a++) {
            temp.push(arr[a])
            if (a % size === size - 1) {
                result.push(temp)
                temp = []
            }
        }

        if (temp.length > 0) result.push(temp)

        return result
    }

    const values = props.values.concat([0])

    return <View>
        <Modal animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <SafeAreaView style={styles.multiplierContainer}>
                <TouchableHighlight style={[styles.buttonMultiplier, styles.simple]} onPress={() => { props.onAddValue("1x" + value.toString()); setModalVisible(false) }}>
                    <Text style={styles.multiplierText}>
                        x1
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.buttonMultiplier, styles.double]} onPress={() => { props.onAddValue("2x" + value.toString()); setModalVisible(false) }}>
                    <Text style={styles.multiplierText}>
                        x2
                    </Text>
                </TouchableHighlight>
                {value != 25 ? <TouchableHighlight style={[styles.buttonMultiplier, styles.triple]} onPress={() => { props.onAddValue("3x" + value.toString()); setModalVisible(false) }}>
                    <Text style={styles.multiplierText}>
                        x3
                    </Text>
                </TouchableHighlight> : <View></View>}
                <TouchableHighlight>
                    <Text>

                    </Text>
                </TouchableHighlight>
            </SafeAreaView>
        </Modal>
        <View style={styles.keyboardContainer}>
            {chunkArrayInGroups(props.values.concat([0]), 4).map((l) => (
                <View style={styles.rowContainer}>
                    {
                        l.map((key) => (
                            renderButton(key)
                        ))}
                </View>
            ))}
        </View>
    </View>
}

const styles = StyleSheet.create({

    rowContainer: {
        flexDirection: 'row',
        height: '15%',
    },
    multiplierContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    button: {
        width: '20%',
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'grey',
        fontSize: 30,
    },
    buttonMultiplier: {
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 10,
    },
    multiplierText: {
        color: 'white',
        fontSize: 30,
    },
    simple: {
        backgroundColor: 'rgb(240, 231, 151)',
    },
    double: {
        backgroundColor: 'green',
    },
    triple: {
        backgroundColor: 'red',
    },
    keyboardContainer: {
        height: '85%',
    },
})