import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet, Text, Modal, TouchableHighlight, SafeAreaView, Dimensions } from "react-native";

export default function PlayerTitleName(props: { children: React.JSX.Element, name: string }) {
    const [modalVisible, setModalVisible] = useState(false)

    return <View style={styles.container}>
        <Text style={styles.text}> {props.name}</Text>
        <Modal animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <SafeAreaView style={styles.modalContainer}>
                {props.children}
                <TouchableHighlight style={styles.closeModal} onPress={() => { setModalVisible(false) }}>
                    <Entypo name='arrow-with-circle-down' size={80} color={'white'} />
                </TouchableHighlight>
            </SafeAreaView>
        </Modal>
        <TouchableHighlight style={styles.scoreButton} onPress={() => { setModalVisible(true) }}>
            <Entypo name="clipboard" size={40} color="white" />
        </TouchableHighlight>
    </View>
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 75,
    },
    scoreButton: {
        position: 'absolute',
        right: '5%',
    },
    closeModal: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: '5%',
    },
    modalContainer: {
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
    }
});