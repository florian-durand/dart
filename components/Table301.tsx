import { Entypo } from "@expo/vector-icons";
import { View, StyleSheet, FlatList, Text, SafeAreaView, TouchableHighlight, Dimensions } from "react-native";

export default function Table301(props: { names: string[], scores: number[] }) {

    const data = props.names.map((name, index) => ({ name: name, score: props.scores[index] }));

    return <FlatList data={data} renderItem={({ item, index }) => (
        <View style={styles.scoreContainer}>
            <Text style={styles.name}>
                {item.name}
            </Text>
            <Text style={styles.score}>
                {item.score}
            </Text>

        </View>
    )}>
    </FlatList>
}



const styles = StyleSheet.create({
    scoreContainer: {
        flexDirection: 'row',

    },
    name: {
        color: 'white',
        fontSize: 50,
        width: '50%',
        textAlign: 'center'
    },
    score: {
        color: 'white',
        fontSize: 50,
        width: '50%',
        textAlign: 'center'
    }
});