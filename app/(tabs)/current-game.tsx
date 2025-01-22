import Screen301 from '@/components/Screen301';
import ScreenCricket from '@/components/ScreenCricket';
import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';



const routes = [
    { key: 'first', title: 'First' },
];

export default function TabViewExample() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

    type SearchParamType = {
        gamemodeName: string,
    };

    const gamemodeName = useLocalSearchParams<SearchParamType>().gamemodeName;

    const renderScene = SceneMap({
        first: gamemodeName === '301' ? Screen301 : ScreenCricket,
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}