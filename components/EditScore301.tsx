import { SafeAreaView, View } from "react-native";
import PlayerTitleName from "./PlayerNameTitle";
import Score301 from "./Score301";
import { useEffect, useState } from "react";
import Keyboard301 from "./Keyboard301";
import DartScores from "./DartScores";
import Table301 from "./Table301";

export default function EditScore301(props: { playerName: string, score: number, onScoreUpdate: (score: number) => void, names: string[], scores: number[], closeModal: () => void }) {

    const [score, setScore] = useState(301)
    const [dartScores, setDartScores] = useState(["", "", ""])
    const [dartIndex, setDartIndex] = useState(0)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

    useEffect(() => {
        setScore(props.score)
    }, [props.score, props.playerName])


    const onRemoveValue = () => {
        const newDartScores = [...dartScores]
        if (dartIndex > 0) {
            setScore(score + Number(newDartScores[dartIndex - 1]))
            newDartScores[dartIndex - 1] = "";
            setDartIndex(dartIndex - 1);
            setDartScores(newDartScores)
            clearTimeout(timeoutId)
        }
    }

    const onAddValue = (value: number) => {
        const newDartScores = [...dartScores]
        const newScore = score - value
        const newDartIndex = dartIndex + 1
        newDartScores[dartIndex] = value.toString()
        setDartIndex(newDartIndex)
        setDartScores(newDartScores)
        setScore(newScore)
        if (newDartIndex === 3) {
            setTimeoutId(setTimeout(() => {
                props.onScoreUpdate(newScore)
                setDartScores(["", "", ""])
                setDartIndex(0)
            }, 1000))
        }

    }

    return <SafeAreaView>
        <PlayerTitleName name={props.playerName}>
            <Table301 names={props.names} scores={props.scores} />
        </PlayerTitleName>
        <Score301 score={score} />
        <DartScores dartScores={dartScores} onRemoveValue={onRemoveValue} ></DartScores>
        <Keyboard301 onAddValue={onAddValue} />
    </SafeAreaView>
}