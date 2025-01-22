import { SafeAreaView, View } from "react-native";
import PlayerTitleName from "./PlayerNameTitle";
import Score301 from "./Score301";
import { useEffect, useState } from "react";
import Keyboard301 from "./Keyboard301";
import ScoreCricket from "./ScoreCricket";
import KeyboardCricket from "./KeyboardCricket";
import DartScores from "./DartScores";

export default function EditScoreCricket(props: { playerName: string, score: number, doors: number[], values: number[], onScoreUpdate: (score: number[]) => void }) {

    const [doors, setDoors] = useState([0, 0, 0, 0, 0, 0, 0])
    const [dartScores, setDartScores] = useState(["", "", ""])
    const [dartIndex, setDartIndex] = useState(0)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

    useEffect(() => {
        setDoors(props.doors)
    }, [props.doors, props.playerName])

    const getValueIndex = (value: number) => {
        return props.values.findIndex((e) => e == value)
    }

    const onRemoveValue = () => {
        const newDartScores = [...dartScores]
        if (dartIndex > 0) {
            const lastshot = newDartScores[dartIndex - 1].split('x').map((x) => Number(x));
            if (lastshot[1] != 0) {
                const newDoors = [...doors]
                newDoors[getValueIndex(lastshot[1])] -= lastshot[0];
                setDoors(newDoors)
            }
            newDartScores[dartIndex - 1] = "";
            setDartIndex(dartIndex - 1);
            setDartScores(newDartScores)
            clearTimeout(timeoutId)
        }
    }

    const onAddValue = (value: string) => {
        const lastshot = value.split('x').map((x) => Number(x));
        const newDartScores = [...dartScores]
        const newDoors = [...doors]
        if (lastshot[1] != 0) {
            newDoors[getValueIndex(lastshot[1])] += lastshot[0];
        }
        const newDartIndex = dartIndex + 1
        newDartScores[dartIndex] = value
        setDartIndex(newDartIndex)
        setDartScores(newDartScores)
        setDoors(newDoors)

        if (newDartIndex === 3) {
            setTimeoutId(setTimeout(() => {
                props.onScoreUpdate(newDoors)
                setDartScores(["", "", ""])
                setDartIndex(0)
            }, 1000))
        }
    }

    return <SafeAreaView>
        <PlayerTitleName>
            {props.playerName}
        </PlayerTitleName>
        <ScoreCricket score={props.score} doors={doors} values={props.values} />
        <DartScores dartScores={dartScores} onRemoveValue={onRemoveValue} ></DartScores>
        <KeyboardCricket onAddValue={onAddValue} values={props.values} />
    </SafeAreaView>
}