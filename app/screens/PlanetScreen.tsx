import React from 'react';
import { View, Pressable, useWindowDimensions, Image, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/text/text';
import { color, spacing, typography } from '../theme';
import DrawerSvg from '../svg/DrawerSvg';
import Divider from '../components/divider';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { TabView, SceneMap, TabBar, TabBarProps, } from 'react-native-tab-view';
import { Route } from '@react-navigation/native';
import { PlanetType } from '../../App';
import { MercurySvg, EarthSvg, JupiterSvg, MarsSvg, NeptuneSvg, SaturnSvg, UranusSvg, VenusSvg } from '../svg/index'
import IconSource from '../svg/IconSource';

const mercury =  {
    name: 'mercury',
    color: '#DEF4FC',
    image: require('../../assets/geology-mercury.png'),
    description: "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets. Mercury is one of four terrestrial planets in the Solar System, and is a rocky body like Earth.",
    rotationTime: "58.6 days",
    revolutionTime: "87.97 days",
    radius: "2,439.7 km",
    avgTemp: "430°c",
    wikiLink: "https://en.wikipedia.org/wiki/Mercury",
};

const getSvg = (name: string) => {
    switch (name) {
        case 'mercury':
            return <MercurySvg />
        case 'earth':
            return <EarthSvg />
        case 'jupiter':
            return <JupiterSvg />
        case 'mars': 
            return <MarsSvg />
        case 'neptune':
            return <NeptuneSvg />
        case 'saturn':
            return <SaturnSvg />
        case 'uranus':
            return <UranusSvg />
        case 'venus':
            return <VenusSvg />
    }
}

const Section = ({ title, value }: {title: string, value: string}) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center',  borderWidth: 1, borderColor: color.grey, justifyContent: 'space-between', marginBottom: spacing[4], padding: spacing[4] }}>
            <Text preset="small">{title}</Text>
            <Text preset="h2">{value}</Text>
        </View>
    )
}

const FirstRoute = ({ planet } : {planet: PlanetType}) => {
    const { name, description, radius, revolutionTime, rotationTime, wikiLink, avgTemp } = planet;
    return (
        <ScrollView style={{ flex: 1, backgroundColor: color.black }}>
            <View style={{ alignSelf: 'center', paddingVertical: spacing[8], paddingHorizontal: spacing[4]}}>
                {getSvg(name)}
            </View>
            <View style={{ paddingHorizontal: spacing[5] }}>
                <Text centered preset='h1' style={{ textTransform: 'uppercase' }}>{name}</Text>
                <Text centered style={{ paddingTop: spacing[4], lineHeight: 21 }}>
                    {description}
                </Text>
            </View>

            <Pressable onPress={() => Linking.openURL(wikiLink)} style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', padding: spacing[5] }}>
                <Text centered>
                    Source: {' '}
                </Text>
                <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline', marginRight: 4 }}>
                    Wikipedia
                </Text>
                <IconSource />
            </Pressable>

            <View style={{ padding: spacing[5] }}>
                <Section title="ROTATION TIME" value={rotationTime} />
                <Section title="REVOLUTION TIME" value={revolutionTime} />
                <Section title="RADIUS" value={radius} />
                <Section title="AVERAGE TEMP." value={avgTemp} />
            </View>
        </ScrollView>
    )
}


const SecondRoute = ({ planet }: { planet: PlanetType }) => {
    const { name } = planet;
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: color.black,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            {getSvg(name)}
            <Text preset="h1" style={{ padding: spacing[8] }}>NO DATA YET.</Text>
        </View>
    );
};

const ThirdRoute = ({ planet }: { planet: PlanetType }) => {
    const { name } = planet;
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: color.black,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            {getSvg(name)}
            <Text preset="h1" style={{ padding: spacing[8] }}>NO DATA YET.</Text>
        </View>
    );
};

interface Props {
    navigation: DrawerNavigationProp<any>;
    route: {
        params: {
            planet: PlanetType,
        }
    }
}

export default function PlanetScreen({navigation, route}: Props) {
    const layout = useWindowDimensions();
    const planet = route.params?.planet ?? mercury;
    const { color: planetColor } = planet;

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'OVERVIEW' },
      { key: 'second', title: 'STRUCTURE' },
      { key: 'third', title: 'SURFACE' },
    ]);

    const renderScene = ({ route: sceneRoute }: {route: any}) => {
        switch (sceneRoute.key) {
          case 'first':
            return <FirstRoute planet={planet} />;
          case 'second':
            return <SecondRoute planet={planet} />;
          default:
            return <ThirdRoute planet={planet} />;
        }
      };

    const renderTabBar = (props: any) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: planetColor }}
          style={{ backgroundColor: 'transparent' }}
          labelStyle={{ fontFamily: typography.primaryBold, fontSize: 12 }}
        />
    )

    return (
        <SafeAreaView style={{ backgroundColor: color.black, flex: 1 }}>
            <View
                style={{
                    paddingHorizontal: spacing[6],
                    paddingBottom: spacing[4],
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <Text preset="h2">THE PLANETS</Text>
                <Pressable onPress={() => navigation.openDrawer()}>
                    <DrawerSvg />
                </Pressable>
            </View>

            <Divider />

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
                
            />
        </SafeAreaView>
    );
}
