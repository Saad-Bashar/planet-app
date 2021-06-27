import React from 'react'
import { StyleSheet, View, ScrollView, Pressable, Linking } from 'react-native'
import { PlanetType } from '../../App';
import { color, spacing } from '../theme';
import Text from './text/text'
import { MercurySvg, EarthSvg, JupiterSvg, MarsSvg, NeptuneSvg, SaturnSvg, UranusSvg, VenusSvg } from '../svg/index'
import IconSource from '../svg/IconSource';
import PlanetSection from './planet-section';
import MercuryInternal from '../svg/MercuryInternal';
import EarthInternal from '../svg/EarthInternal';
import VenusInternal from '../svg/VenusInternal';
import MarsInternal from '../svg/MarsInternal';
import JupiterInternal from '../svg/JupiterInternal';
import NeptuneInternal from '../svg/NeptuneInternal';
import SaturnInternal from '../svg/SaturnInternal';
import UranusInternal from '../svg/UranusInternal';

const getIcon = (name: string) => {
    switch (name) {
        case 'mercury':
            return <MercuryInternal />
        case 'earth':
            return <EarthInternal />
        case 'jupiter':
            return <JupiterInternal />
        case 'mars': 
            return <MarsInternal />
        case 'neptune':
            return <NeptuneInternal />
        case 'saturn':
            return <SaturnInternal />
        case 'uranus':
            return <UranusInternal /> 
        case 'venus':
            return <VenusInternal />
    }
}

export default function PlanetStructureTab({ planet } : { planet: PlanetType}) {
    const { name, structure, radius, revolutionTime, rotationTime, wikiLink, avgTemp } = planet;
    return (
        <ScrollView>
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
                    {structure}
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
    )
}
