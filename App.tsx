import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { color, spacing } from './app/theme/';
import DrawerSvg from './app/svg/DrawerSvg';
import ChevronSvg from './app/svg/ChevronSvg'
import Divider from './app/components/divider'
import { useFonts } from 'expo-font';
import Text from './app/components/text/text';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlanetScreen from './app/screens/PlanetScreen';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    useWindowDimensions,
    Pressable,
} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerContentScrollView
} from '@react-navigation/drawer';

export interface PlanetType {
    name: string;
    color: string;
    description: string;
    radius: string;
    rotationTime: string;
    revolutionTime: string;
    avgTemp: string;
    wikiLink: string;
}

export const PLANET_LIST: PlanetType[] = [
    {
        name: 'mercury',
        color: '#DEF4FC',
        description: "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets. Mercury is one of four terrestrial planets in the Solar System, and is a rocky body like Earth.",
        rotationTime: "58.6 days",
        revolutionTime: "87.97 days",
        radius: "2,439.7 km",
        avgTemp: "430°c",
        wikiLink: "https://en.wikipedia.org/wiki/Mercury",
    },
    {
        name: 'venus',
        color: '#F7CC7F',
        description: "Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be, on rare occasions, visible to the naked eye in broad daylight.",
        rotationTime: "243 days",
        revolutionTime: "224.7 days",
        radius: "6,051.8 km",
        avgTemp: "471°c",
        wikiLink: 'https://en.wikipedia.org/wiki/Venus'
    },
    {
        name: 'earth',
        color: '#545BFE',
        description: "Third planet from the Sun and the only known planet to harbor life. About 29.2% of Earth's surface is land with remaining 70.8% is covered with water. Earth's distance from the Sun, physical properties and geological history have allowed life to evolve and thrive.",
        rotationTime: "0.99 days",
        revolutionTime: "365.26 days",
        radius: "6,371 km",
        avgTemp: "16°c",
        wikiLink: 'https://en.wikipedia.org/wiki/Earth'
    },
    {
        name: 'mars',
        color: '#FF6A45',
        description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the 'Red Planet'.",
        rotationTime: "1.03 days",
        revolutionTime: "1.88 years",
        radius: "3,389.5 km",
        avgTemp: "−28°c",
        wikiLink: 'https://en.wikipedia.org/wiki/Mars'
    },
    {
        name: 'jupiter',
        color: '#ECAD7A',
        description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass two and a half times that of all the other planets in the Solar System combined, but less than one-thousandth the mass of the Sun." ,
        rotationTime: "9.93 hours",
        revolutionTime: "11.86 years",
        radius: "69,911 km",
        avgTemp: "-108°c",
        wikiLink: 'https://en.wikipedia.org/wiki/Jupiter'
    },
    {
        name: 'saturn',
        color: '#FCCB6B',
        description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth. It only has one-eighth the average density of Earth.",
        rotationTime: "10.8 hours",
        revolutionTime: "29.46 years",
        radius: "58,232 km",
        avgTemp: "-138°c",
        wikiLink: 'https://en.wikipedia.org/wiki/Saturn'
    },
    {
        name: 'uranus',
        color: '#65F0D5',
        description: "Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus according to Greek mythology, was the great-grandfather of Ares. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.",
        rotationTime: "17.2 hours",
        revolutionTime: "84 years",
        radius: "25,362 km",
        avgTemp: "-195°c",
        wikiLink: 'https://en.wikipedia.org/wiki/Uranus'
    },
    {
        name: 'neptune',
        color: '#497EFA',
        description: "Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth, more massive than its near-twin Uranus.",
        rotationTime: "16.08 hours",
        revolutionTime: "164.79 years",
        radius: "24,622 km",
        avgTemp: "-201°c",
        wikiLink: 'https://en.wikipedia.org/wiki/Neptune'
    },
];


function DrawerContent(props: DrawerContentComponentProps) {
    const onPress = (name: string) => {
        const { navigation } = props;
        const planet = PLANET_LIST.find(p => p.name === name);
        return navigation.navigate('Planet', { planet });
    }
    return (
        <>
            <DrawerContentScrollView {...props}>
                <View style={styles.header}>
                    <Text preset="h2">THE PLANETS</Text>
                    <Pressable onPress={() => props.navigation.closeDrawer()}>
                        <DrawerSvg />
                    </Pressable>
                </View>

                <Divider />

                <View style={{ paddingVertical: spacing[4], paddingHorizontal: spacing[6]}}>
                    {PLANET_LIST.map((item, index) => {
                        const isLastItem = index == PLANET_LIST.length - 1 
                        return (
                            <Pressable onPress={() => onPress(item.name)}key={item.name}>
                                <View style={styles.drawerRow}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={[styles.circle, {backgroundColor: item.color} ]} />
                                        <Text style={{ textTransform: 'uppercase' }}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <ChevronSvg />
                                </View>
                                {!isLastItem && (<Divider />)}
                            </Pressable>
                        );
                    })}
                </View>
            </DrawerContentScrollView>
        </>
    );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
    const windowWidth = useWindowDimensions().width;
    let [fontsLoaded] = useFonts({
        'Antonio-Medium': require('./assets/fonts/Antonio-Medium.ttf'),
        'Spartan-Bold': require('./assets/fonts/Spartan-Bold.ttf'),
        'Spartan-Regular': require('./assets/fonts/Spartan-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator />;
    }

    return (
        <NavigationContainer>
            <StatusBar style="light" />
            <Drawer.Navigator
                openByDefault
                drawerStyle={{ width: windowWidth, backgroundColor: color.black }}
                drawerPosition="right"
                drawerContent={props => <DrawerContent {...props} />}>
                <Stack.Screen name="Planet" component={PlanetScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        paddingHorizontal: spacing[6],
        paddingVertical: spacing[4],
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    drawerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing[5],
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        marginRight: spacing[4],
    }
});
