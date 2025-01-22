import { Entypo } from "@expo/vector-icons";
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function DartScores(props: { dartScores: string[], onRemoveValue: () => void }) {
    return <View style={styles.dartsContainer}>
        <View style={styles.dartsScore}>
            <Text style={styles.dartText}>
                {props.dartScores[0]}
            </Text>
        </View>
        <View style={styles.dartsScore}>
            <Text style={styles.dartText}>
                {props.dartScores[1]}
            </Text>
        </View>
        <View style={styles.dartsScore}>
            <Text style={styles.dartText}>
                {props.dartScores[2]}
            </Text>
        </View>
        <Entypo style={styles.erase} name="erase" size={60} color="red" onPress={() => {
            props.onRemoveValue();
        }} />
    </View>
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    dartsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dartsScore: {
        height: windowWidth * 0.2,
        width: windowWidth * 0.2,
        borderColor: 'gray',
        borderWidth: 1,
        marginHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dartText: {
        color: 'white',
        fontSize: 20,
    },
    erase: {
        position: 'absolute',
        marginLeft: 10,
        right: 0
    },
})