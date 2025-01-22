import { useState } from "react";
import SessionStorage from "react-native-session-storage";
import { useLocalSearchParams } from "expo-router";
import EditScoreCricket from "./EditScoreCricket";

export default function ScreenCricket() {

    type SearchParamType = {
        playOrder: string,
        cricketValues: string,
    };

    const names: string[] = JSON.parse(SessionStorage.getItem("names"))
    const scores: number[] = JSON.parse(SessionStorage.getItem("scores"));
    const doorsScores: Array<number[]> = JSON.parse(SessionStorage.getItem("doors"));
    const [playerIndex, setPlayerIndex] = useState(0)
    const playOrder = useLocalSearchParams<SearchParamType>().playOrder.split(',');
    const values = useLocalSearchParams<SearchParamType>().cricketValues.split(',').map(x => Number(x));

    const scoreIndex = names.findIndex((e) => e == playOrder[playerIndex]);

    const onScoreUpdate = (doors: number[]) => {
        const overflow = doors.map((v) => v > 3 ? v - 3 : 0);
        names.forEach((name, index) => {
            if (name != playOrder[playerIndex]) {
                const currentDoors = doorsScores[index]
                overflow.forEach((v, j) => {
                    if (v > 0 && currentDoors[j] < 3) {
                        scores[index] += values[j] * v
                    }
                })
            }
        })
        doorsScores[scoreIndex] = doors.map((v) => v > 3 ? 3 : v);
        SessionStorage.setItem('scores', JSON.stringify(scores))
        SessionStorage.setItem('doors', JSON.stringify(doorsScores))
        setPlayerIndex((playerIndex + 1) % playOrder.length)
    }



    return <EditScoreCricket playerName={playOrder[playerIndex]} score={scores[scoreIndex]} doors={doorsScores[scoreIndex]} values={values} onScoreUpdate={onScoreUpdate}>
    </EditScoreCricket>
}