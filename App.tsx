import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,  View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import Text from './app/components/text/text'

export default function App() {
  let [fontsLoaded] = useFonts({
    'Antonio-Medium': require('./assets/fonts/Antonio-Medium.ttf'),
    'Spartan-Bold': require('./assets/fonts/Spartan-Bold.ttf'),
    'Spartan-Regular': require('./assets/fonts/Spartan-Regular.ttf'),
  });

  if(!fontsLoaded) {
    return (
      <ActivityIndicator />
    )
  }

  return (
    <View style={styles.container}>
      <Text preset="h4">Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
