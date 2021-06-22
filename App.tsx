import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    useWindowDimensions,
    Pressable,
} from 'react-native';
import { useFonts } from 'expo-font';
import Text from './app/components/text/text';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator,
    DrawerContentComponentProps,
} from '@react-navigation/drawer';
import PlanetScreen from './app/screens/PlanetScreen';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { color, spacing } from './app/theme/';
import DrawerSvg from './app/svg/DrawerSvg';
import ChevronSvg from './app/svg/ChevronSvg';

const PLANET_LIST = [
    {
        name: 'mercury',
        color: '#DEF4FC',
    },
    {
        name: 'venus',
        color: '#F7CC7F',
    },
    {
        name: 'earth',
        color: '#545BFE',
    },
    {
        name: 'mars',
        color: '#FF6A45',
    },
    {
        name: 'jupiter',
        color: '#ECAD7A',
    },
    {
        name: 'saturn',
        color: '#FCCB6B',
    },
    {
        name: 'uranus',
        color: '#65F0D5',
    },
    {
        name: 'neptune',
        color: '#497EFA',
    },
];

const Divider = () => {
    return (
        <View
            style={{
                height: 1,
                width: '100%',
                backgroundColor: color.white,
                opacity: 0.2,
            }}
        />
    );
};

function DrawerContent(props: DrawerContentComponentProps) {
    return (
        <>
            <DrawerContentScrollView {...props}>
                <View
                    style={{
                        paddingHorizontal: spacing[6],
                        paddingBottom: spacing[4],
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <Text preset="h2">THE PLANETS</Text>
                    <Pressable onPress={() => props.navigation.closeDrawer()}>
                        <DrawerSvg />
                    </Pressable>
                </View>

                <Divider />

                <View
                    style={{
                        paddingVertical: spacing[4],
                        paddingHorizontal: spacing[6],
                    }}>
                    {PLANET_LIST.map((item, index) => {
                        const isLastItem = index == PLANET_LIST.length - 1 
                        return (
                            <Pressable onPress={() => props.navigation.navigate("Planet")}key={item.name}>
                                <View
                                    
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingVertical: spacing[5],
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <View
                                            style={{
                                                height: 20,
                                                width: 20,
                                                borderRadius: 10,
                                                backgroundColor: item.color,
                                                marginRight: spacing[4],
                                            }}
                                        />
                                        <Text
                                            style={{
                                                textTransform: 'uppercase',
                                            }}>
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
                drawerStyle={{
                    width: windowWidth,
                    backgroundColor: color.black,
                }}
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
});
