import React from 'react';
import { View } from 'react-native';
import { color } from '../theme';

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


export default Divider;