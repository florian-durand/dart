import { View, StyleSheet, Text, Dimensions } from "react-native";

export default function Score301(props: { score: number }) {

    return <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}> {props.score}</Text>
    </View>
}

const styles = StyleSheet.create({
    scoreContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreText: {
        color: 'white',
        fontSize: 75,
    },
});