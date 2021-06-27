import React from 'react';
import { View, Pressable, useWindowDimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/text/text';
import { color, spacing, typography } from '../theme';
import DrawerSvg from '../svg/DrawerSvg';
import Divider from '../components/divider';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { TabView, TabBar} from 'react-native-tab-view';
import { PlanetType } from '../../App';
import PlanetOverviewTab from '../components/planet-overview-tab';
import PlanetStructureTab from '../components/planet-structure-tab';
import PlanetSurfaceTab from '../components/planet-surface-tab';
import StarBackground from '../svg/StarBackground';

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

const OverviewTab = ({ planet } : {planet: PlanetType}) => {
    return (
        <PlanetOverviewTab planet={planet} />
    );
}


const StructureTab = ({ planet }: { planet: PlanetType }) => {
    return (
        <PlanetStructureTab planet={planet} />
    );
};

const SurfaceTab = ({ planet }: { planet: PlanetType }) => {
   return (
       <PlanetSurfaceTab planet={planet} />
   )
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
            return <OverviewTab planet={planet} />;
          case 'second':
            return <StructureTab planet={planet} />;
          default:
            return <SurfaceTab planet={planet} />;
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
            <View style={StyleSheet.absoluteFill}>
                <StarBackground />
            </View>
            <View style={styles.header}>
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

const styles = StyleSheet.create({
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: color.grey,
        justifyContent: 'space-between',
        marginBottom: spacing[4],
        padding: spacing[4],
    },
    emptyView: {
        flex: 1,
        backgroundColor: color.black,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        paddingHorizontal: spacing[6],
        paddingBottom: spacing[4],
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing[4],
    }
});