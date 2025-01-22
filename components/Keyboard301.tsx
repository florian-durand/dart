import { useState } from "react";
import { View, StyleSheet, TouchableHighlight, Text, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Keyboard301(props: { onAddValue: (value: number) => void }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState(0)

    const arrayRange = (start: number, stop: number, step: number) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
        );


    const renderButton = (v: number) => {
        return <TouchableHighlight key={v} style={styles.button} onPress={() => { setValue(v); setModalVisible(true); }}>
            <Text style={styles.buttonText}>
                {v}
            </Text>
        </TouchableHighlight>
    }


    return <View>
        <Modal animationType="none"
            transparent={true}
            visible={modalVisible}

            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <SafeAreaView style={styles.multiplierContainer}>
                <TouchableHighlight style={[styles.buttonMultiplier, styles.simple]} onPress={() => { props.onAddValue(value); setModalVisible(false) }}>
                    <Text style={styles.multiplierText}>
                        x1
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.buttonMultiplier, styles.double]} onPress={() => { props.onAddValue(value * 2); setModalVisible(false) }}>
                    <Text style={styles.multiplierText}>
                        x2
                    </Text>
                </TouchableHighlight>
                {value != 25 ? <TouchableHighlight style={[styles.buttonMultiplier, styles.triple]} onPress={() => { props.onAddValue(value * 3); setModalVisible(false) }}>
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
            <View style={styles.rowContainer}>
                {arrayRange(1, 4, 1).map((key) => { return renderButton(key) })}
            </View>
            <View style={styles.rowContainer}>
                {arrayRange(5, 8, 1).map((key) => { return renderButton(key) })}
            </View>
            <View style={styles.rowContainer}>
                {arrayRange(9, 12, 1).map((key) => { return renderButton(key) })}
            </View>
            <View style={styles.rowContainer}>
                {arrayRange(13, 16, 1).map((key) => { return renderButton(key) })}
            </View>
            <View style={styles.rowContainer}>
                {arrayRange(17, 20, 1).map((key) => { return renderButton(key) })}
            </View>
            <View style={styles.rowContainer}>
                <TouchableHighlight style={styles.button} onPress={() => { setValue(25); setModalVisible(true); }}>
                    <Text style={styles.buttonText}>
                        {25}
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={() => { setValue(0); props.onAddValue(0); }}>
                    <Text style={styles.buttonText}>
                        {0}
                    </Text>
                </TouchableHighlight>
            </View>
        </View>

    </View >
}

const styles = StyleSheet.create({

    rowContainer: {
        flexDirection: 'row',
        height: '11%',
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