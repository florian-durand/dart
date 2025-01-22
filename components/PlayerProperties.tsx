import { TextInput, View, TouchableHighlight, Dimensions, StyleSheet } from "react-native";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function PlayerProperties(props: { name: string, team: string, index: number, removePlayer: (index: number) => void, onChange: (name: string, team: string | null, index: number) => void }) {
    const [dropdownItems, setDropdownItems] = useState([{ label: 'Red', value: 'red' },
    { label: 'White', value: 'white' }, { label: 'Blue', value: 'blue' }, { label: 'Green', value: 'green' }, { label: 'Yellow', value: 'yellow' }])
    const [dropdownValue, setDropdownValue] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    return (<View style={styles.playerContainer}>
        <TouchableHighlight style={styles.removePlayerButton} onPress={() => { props.removePlayer(props.index) }}>
            <Ionicons name="trash-bin" size={24} color="red" />
        </TouchableHighlight>
        <TextInput autoFocus style={styles.inputName} value={props.name} placeholder='Player name' onChangeText={(name) => {
            props.onChange(name, dropdownValue, props.index)
        }} >
        </TextInput>
        <DropDownPicker addCustomItem={true} containerStyle={{ zIndex: 100 - props.index }} style={styles.dropdownStyle} placeholder='Team' value={dropdownValue} items={dropdownItems} multiple={false} setValue={setDropdownValue} open={dropdownOpen} setOpen={setDropdownOpen} onChangeValue={() => {
            props.onChange(props.name, dropdownValue, props.index)
        }}>
        </DropDownPicker>
    </View>)
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
        backgroundColor: 'rgb(15,15,15)'
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
    }

});