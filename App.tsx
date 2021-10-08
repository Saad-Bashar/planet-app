import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { color, spacing } from './app/theme/';
import DrawerSvg from './app/svg/DrawerSvg';
import ChevronSvg from './app/svg/ChevronSvg'
import Divider from './app/components/divider'
import { useFonts } from 'expo-font';
import Text from './app/components/text/text';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlanetScreen from './app/screens/planet-screen';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    useWindowDimensions,
    Pressable,
    ImageSourcePropType,
    TextInput,
    Dimensions,
} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerContentScrollView
} from '@react-navigation/drawer';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons'; 
import MultiSlider from '@ptomasroos/react-native-multi-slider';


export interface PlanetType {
    name: string;
    color: string;
    description: string;
    radius: number;
    rotationTime: number;
    revolutionTime: string;
    avgTemp: string;
    wikiLink: string;
    structure: string;
    surface: string;
    surfaceImage: ImageSourcePropType;
}

export const PLANET_LIST: PlanetType[] = [
    {
        name: 'mercury',
        color: '#DEF4FC',
        description: "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets. Mercury is one of four terrestrial planets in the Solar System, and is a rocky body like Earth.",
        rotationTime: 58.6,
        revolutionTime: "87.97 days",
        radius: 2439.7,
        avgTemp: "430°c",
        wikiLink: "https://en.wikipedia.org/wiki/Mercury",
        structure: "Mercury appears to have a solid silicate crust and mantle overlying a solid, iron sulfide outer core layer, a deeper liquid core layer, and a solid inner core. The planet's density is the second highest in the Solar System at 5.427 g/cm3 , only slightly less than Earth's density.",
        surface: "Mercury's surface is similar in appearance to that of the Moon, showing extensive mare-like plains and heavy cratering, indicating that it has been geologically inactive for billions of years. It is more heterogeneous than either Mars's or the Moon’s.",
        surfaceImage: require('./assets/geology-mercury.png')
    },
    {
        name: 'venus',
        color: '#F7CC7F',
        description: "Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be, on rare occasions, visible to the naked eye in broad daylight.",
        rotationTime: 243,
        revolutionTime: "224.7 days",
        radius: 6051.8,
        avgTemp: "471°c",
        wikiLink: 'https://en.wikipedia.org/wiki/Venus',
        structure: "The similarity in size and density between Venus and Earth suggests they share a similar internal structure: a core, mantle, and crust. Like that of Earth, Venusian core is most likely at least partially liquid because the two planets have been cooling at about the same rate.",
        surface: "Much of the Venusian surface appears to have been shaped by volcanic activity. Venus has several times as many volcanoes as Earth, and it has 167 large volcanoes that are over 100 km (60 mi) across. The only volcanic complex of this size on Earth is the Big Island of Hawaii.",
        surfaceImage: require('./assets/geology-venus.png')  
    },
    {
        name: 'earth',
        color: '#545BFE',
        description: "Third planet from the Sun and the only known planet to harbor life. About 29.2% of Earth's surface is land with remaining 70.8% is covered with water. Earth's distance from the Sun, physical properties and geological history have allowed life to evolve and thrive.",
        rotationTime: 0.99,
        revolutionTime: "365.26 days",
        radius: 6371,
        avgTemp: "16°c",
        wikiLink: 'https://en.wikipedia.org/wiki/Earth',
        structure: "Earth's interior, like that of the other terrestrial planets, is divided into layers by their chemical or physical (rheological) properties. The outer layer is a chemically distinct silicate solid crust, which is underlain by a highly viscous solid mantle.",
        surface: "The total surface area of Earth is about 510 million km2. The continental crust consists of lower density material such as the igneous rocks granite and andesite. Less common is basalt, a denser volcanic rock that is the primary constituent of the ocean floors.",
        surfaceImage: require('./assets/geology-earth.png') 
    },
    {
        name: 'mars',
        color: '#FF6A45',
        description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the 'Red Planet'.",
        rotationTime: 1.03,
        revolutionTime: "1.88 years",
        radius: 3389.5,
        avgTemp: "−28°c",
        wikiLink: 'https://en.wikipedia.org/wiki/Mars',
        structure: "Like Earth, Mars has differentiated into a dense metallic core overlaid by less dense materials. Scientists initially determined that the core is at least partially liquid. Current models of its interior imply a core consisting primarily of iron and nickel with about 16–17% sulfur.",
        surface: "Mars is a terrestrial planet whose surface consists of minerals containing silicon and oxygen, metals, and other elements that typically make up rock. The surface is primarily composed of tholeiitic basalt, although parts are more silica-rich than typical basalt.",
        surfaceImage: require('./assets/geology-mars.png') 
    },
    {
        name: 'jupiter',
        color: '#ECAD7A',
        description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass two and a half times that of all the other planets in the Solar System combined, but less than one-thousandth the mass of the Sun." ,
        rotationTime: 9.93,
        revolutionTime: "11.86 years",
        radius: 69911,
        avgTemp: "-108°c",
        wikiLink: 'https://en.wikipedia.org/wiki/Jupiter',
        structure: "When the Juno arrived in 2016, it found that Jupiter has a very diffuse core that mixes into its mantle. A possible cause is an impact from a planet of about ten Earth masses a few million years after Jupiter's formation, which would have disrupted an originally solid Jovian core.",
        surface: "The best known feature of Jupiter is the Great Red Spot, a persistent anticyclonic storm located 22° south of the equator. It is known to have existed since at least 1831, and possibly since 1665.",
        surfaceImage: require('./assets/geology-jupiter.png') 
    },
    {
        name: 'saturn',
        color: '#FCCB6B',
        description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth. It only has one-eighth the average density of Earth.",
        rotationTime: 10.8,
        revolutionTime: "29.46 years",
        radius: 58232,
        avgTemp: "-138°c",
        wikiLink: 'https://en.wikipedia.org/wiki/Saturn',
        structure: "Despite consisting mostly of hydrogen and helium, most of Saturn's mass is not in the gas phase, because hydrogen becomes a non-ideal liquid when the density is above 0.01 g/cm3, which is reached at a radius containing 99.9% of Saturn's mass.",
        surface: "The outer atmosphere of Saturn contains 96.3% molecular hydrogen and 3.25% helium by volume. The planet's most famous feature is its prominent ring system, which is composed mostly of ice particles with a smaller amount of rocky debris and dust. ",
        surfaceImage: require('./assets/geology-saturn.png') 
    },
    {
        name: 'uranus',
        color: '#65F0D5',
        description: "Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus according to Greek mythology, was the great-grandfather of Ares. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.",
        rotationTime: 17.2,
        revolutionTime: "84 years",
        radius: 25362,
        avgTemp: "-195°c",
        wikiLink: 'https://en.wikipedia.org/wiki/Uranus',
        structure: "The standard model of Uranus's structure is that it consists of three layers: a rocky (silicate/iron–nickel) core in the centre, an icy mantle in the middle and an outer gaseous hydrogen/helium envelope. The core is relatively small, with a mass of only 0.55 Earth masses.",
        surface: "The composition of Uranus's atmosphere is different from its bulk, consisting mainly of molecular hydrogen and helium. The helium molar fraction, i.e. the number of helium atoms per molecule of gas, is 0.15±0.03 in the upper troposphere.",
        surfaceImage: require('./assets/geology-uranus.png') 
    },
    {
        name: 'neptune',
        color: '#497EFA',
        description: "Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth, more massive than its near-twin Uranus.",
        rotationTime: 16.08,
        revolutionTime: "164.79 years",
        radius: 24622,
        avgTemp: "-201°c",
        wikiLink: 'https://en.wikipedia.org/wiki/Neptune',
        structure: "Neptune's internal structure resembles that of Uranus. Its atmosphere forms about 5% to 10% of its mass and extends perhaps 10% to 20% of the way towards the core. Increasing concentrations of methane, ammonia and water are found in the lower regions.",
        surface: "Neptune's atmosphere is 80% hydrogen and 19% helium. A trace amount of methane is also present. Prominent absorption bands of methane exist at wavelengths above 600 nm, in the red and infrared portion of the spectrum.",
        surfaceImage: require('./assets/geology-neptune.png') 
    },
];


export function FilterModal({ visible, filterAction, closeModal, resetFilter } : { visible: boolean, filterAction: (data : any) => void, closeModal: () => void, resetFilter: () => void }) {
    const [rotationTime, setRotationTime] = useState([0, 500]);
    const [radius, setRadius] = useState([1000, 12000]);

    const onPressFilter = () => {
        filterAction({ rotationTime, radius })
        setRotationTime([0, 500]);
        setRadius([1000, 12000]);
        closeModal()
    }

    const onPressReset = () => {
        closeModal()
        resetFilter()
    }
  
    return (
        <Modal
            isVisible={visible}
            swipeDirection="down"
            style={{ justifyContent: 'flex-end' }}
            onBackdropPress={closeModal}
            
        >
            <View style={{ backgroundColor: color.darkGrey, height: Dimensions.get('screen').height / 2, borderRadius: 30, margin: spacing[2] }}>
                <View style={{ margin: spacing[5] }}>
                    <Text preset="h4">
                        Filter
                    </Text>
                    
                    <Text style={[{ marginTop: spacing[4] }]}>Filter by temp: </Text>
                    <View style={{ margin: spacing[4] }}>
                        <Text style={{marginLeft: -15}}>Rotation time : {`${rotationTime[0]} - ${rotationTime[1]}`}</Text>
                        <MultiSlider
                            values={[rotationTime[0], rotationTime[1]]}
                            onValuesChange={(values) => setRotationTime(values)}
                            step={10}
                            allowOverlap
                            snapped
                            min={rotationTime[0]}
                            max={rotationTime[1]}
                        />
                    </View>

                    <Text style={[{ marginTop: spacing[4] }]}>Filter by radius: </Text>
                    <View style={{ margin: spacing[4] }}>
                        <Text style={{marginLeft: -15}}>radius : {`${radius[0]} - ${radius[1]}`}</Text>
                        <MultiSlider
                            values={[radius[0], radius[1]]}
                            onValuesChange={(values) => setRadius(values)}
                            step={10}
                            allowOverlap
                            snapped
                            min={radius[0]}
                            max={radius[1]}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', margin: 15  }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable onPress={onPressFilter} style={{ flex: 1, marginRight: spacing[2],  borderRadius: spacing[4], backgroundColor: 'white', paddingVertical: 15, alignItems: 'center', justifyContent: 'center' }}>
                            <Text preset="h4" textColor="black">FILTER</Text>
                        </Pressable>
                        <Pressable onPress={onPressReset} style={{ flex: 1,  borderRadius: spacing[4], backgroundColor: 'white', paddingVertical: 15, alignItems: 'center', justifyContent: 'center' }}>
                            <Text preset="h4" textColor="black">RESET FILTER</Text>
                        </Pressable>
                    </View>
                </View>
                
            </View>
        </Modal>
    )
}

function DrawerContent(props: DrawerContentComponentProps) {
    const [planetData, setPlanetData] = useState(PLANET_LIST);
    const [filterModal, setFilterModal] = useState(false);

    const searchFilterFunction = (text : string) => {
        const filteredList = PLANET_LIST.filter((item) => {
          const itemData = item.name.toUpperCase();
          const userTypedData = text.toUpperCase();
    
          return itemData.indexOf(userTypedData) > -1;
        });
    
        setPlanetData(filteredList);
    };

    const filterPlanets = (data : any) => {
        const {rotationTime, radius} = data;
        
        // filter by rotation time and radius
        const filteredList = PLANET_LIST.filter((item) => {
            return item.rotationTime >= rotationTime[0] && item.rotationTime <= rotationTime[1] && item.radius >= radius[0] && item.radius <= radius[1];
        });

        setPlanetData(filteredList);
    }

    const resetData = () => {
        setPlanetData(PLANET_LIST);
    }


    const onPress = (name: string) => {
        const { navigation } = props;
        const planet = PLANET_LIST.find(p => p.name === name);
        return navigation.navigate('Planet', { planet });
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.header}>
                    <Text preset="h2">THE PLANETS</Text>
                    <Pressable onPress={() => props.navigation.closeDrawer()}>
                        <DrawerSvg />
                    </Pressable>
                </View>

                <Divider />

                <View style={{ paddingVertical: spacing[4], paddingHorizontal: spacing[6]}}>
                    <TextInput 
                        placeholder="Search by planet name..."
                        placeholderTextColor="white"
                        onChangeText={(text) => {
                            searchFilterFunction(text);
                        }}
                        style={{ padding: spacing[4], borderColor: 'white', borderWidth: 1, color: 'white', borderRadius: spacing[4] }}
                        autoCorrect={false}
                    />
                    {planetData.map((item, index) => {
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
            <Pressable onPress={() => setFilterModal(true)} style={[{ position: 'absolute', bottom: 30, right: 20, marginTop: 20, alignSelf: 'flex-end', backgroundColor: 'white', height: 50, width: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }]}>
                <Feather name="filter" size={24} color="black" />
            </Pressable>
            <FilterModal 
                visible={filterModal} 
                closeModal={() => setFilterModal(false)} 
                filterAction={filterPlanets} 
                resetFilter={resetData}
            />
        </View>
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
