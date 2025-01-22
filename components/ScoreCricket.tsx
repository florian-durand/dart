import { View, StyleSheet, Text } from "react-native";

export default function ScoreCricket(props: { score: number, doors: number[], values: number[] }) {

    return <View style={styles.scoreContainer}>
        {props.values.map((value, index) => (
            <View key={index} style={styles.scoreSubContainer}>
                <Text style={styles.scoreText}>{value}</Text>
                <Text style={styles.scoreText}>{props.doors[index] > 3 ? 3 : props.doors[index]}</Text>
            </View>
        ))}
        <View style={styles.scoreSubContainer}>
            <Text style={styles.scoreText}>{props.score}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    scoreContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    scoreText: {
        color: 'white',
        fontSize: 30,
    },
    scoreSubContainer: {
        flexDirection: 'column',
    }
});