import React from 'react';
import { View, StyleSheet } from 'react-native';
import { color, spacing } from '../theme';
import Text from './text/text';

const Section = ({ title, value }: { title: string; value: string | number }) => {
    return (
        <View style={styles.section}>
            <Text preset="small">{title}</Text>
            <Text preset="h2">{value}</Text>
        </View>
    );
}

interface Props {
    rotationTime: number;
    revolutionTime: string;
    radius: number;
    avgTemp: string;
}

const PlanetSection = ({ rotationTime, revolutionTime, radius, avgTemp }: Props) => {
    return (
        <View style={{ padding: spacing[5] }}>
            <Section title="ROTATION TIME" value={rotationTime} />
            <Section title="REVOLUTION TIME" value={revolutionTime} />
            <Section title="RADIUS" value={radius} />
            <Section title="AVERAGE TEMP." value={avgTemp} />
        </View>
    )
};


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
});


export default PlanetSection;
