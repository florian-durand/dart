import { useState } from "react";
import EditScore301 from "./EditScore301";
import SessionStorage from "react-native-session-storage";
import { useLocalSearchParams } from "expo-router";

export default function Screen301() {

    type SearchParamType = {
        playOrder: string,
        gamemode: string
    };

    const names: string[] = JSON.parse(SessionStorage.getItem("names"))
    const scores: number[] = JSON.parse(SessionStorage.getItem("scores"));
    const [playerIndex, setPlayerIndex] = useState(0)
    const playOrder = useLocalSearchParams<SearchParamType>().playOrder.split(',');

    const scoreIndex = names.findIndex((e) => e == playOrder[playerIndex]);

    const onScoreUpdate = (score: number) => {
        if (score >= 0) {
            scores[scoreIndex] = score;
            SessionStorage.setItem('scores', JSON.stringify(scores))
        }
        setPlayerIndex((playerIndex + 1) % playOrder.length)
    }

    return <EditScore301 playerName={playOrder[playerIndex]} score={scores[scoreIndex]} onScoreUpdate={onScoreUpdate} names={names} scores={scores}>
    </EditScore301>
}