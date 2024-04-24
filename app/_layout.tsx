import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { Text, ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const image = require("../assets/images/background.png")

export default function LayoutRoot() {
  let [fontsLoaded] = useFonts({
    'Michroma': require('../assets/fonts/Michroma-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ImageBackground 
      source={image}
      style={styles.bgImage}
    > 
    <View>
      <Text>Loading...</Text>
    </View>
    </ImageBackground>;
  }

  return (
    <ImageBackground 
      source={image}
      style={styles.bgImage}
    >  
      <SafeAreaProvider 
        style={{
          backgroundColor: 'transparent',
          overflow: 'visible',
          zIndex: 1
        }}
      >
        <Slot />
      </SafeAreaProvider>
   </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'stretch',
    overflow: 'visible',
    zIndex: 0
  }
})