import React from 'react'
import { StyleSheet, View, ScrollView, Pressable, Linking } from 'react-native'
import { PlanetType } from '../../App';
import { color, spacing } from '../theme';
import Text from './text/text'
import { MercurySvg, EarthSvg, JupiterSvg, MarsSvg, NeptuneSvg, SaturnSvg, UranusSvg, VenusSvg } from '../svg/index'
import IconSource from '../svg/IconSource';
import PlanetSection from './planet-section';

const getIcon = (name: string) => {
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

export default function PlanetOverviewTab({ planet } : {planet: PlanetType}) {
    const { name, description, radius, revolutionTime, rotationTime, wikiLink, avgTemp } = planet;
    
    return (
        <ScrollView style={{ flex: 1, backgroundColor: color.black }}>
            <View
                style={{
                    alignSelf: 'center',
                    paddingVertical: spacing[8],
                    paddingHorizontal: spacing[4],
                }}>
                {getIcon(name)}
            </View>
            <View style={{ paddingHorizontal: spacing[5] }}>
                <Text
                    centered
                    preset="h1"
                    style={{ textTransform: 'uppercase' }}>
                    {name}
                </Text>
                <Text
                    centered
                    style={{ paddingTop: spacing[4], lineHeight: 21 }}>
                    {description}
                </Text>
            </View>

            <Pressable
                onPress={() => Linking.openURL(wikiLink)}
                style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignItems: 'center',
                    padding: spacing[5],
                }}>
                <Text centered>Source: </Text>
                <Text
                    style={{
                        fontWeight: 'bold',
                        textDecorationLine: 'underline',
                        marginRight: 4,
                    }}>
                    Wikipedia
                </Text>
                <IconSource />
            </Pressable>

            <PlanetSection
                radius={radius}
                avgTemp={avgTemp}
                rotationTime={rotationTime}
                revolutionTime={revolutionTime}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
})
