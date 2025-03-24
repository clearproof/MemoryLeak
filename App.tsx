import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
} from 'react-native';


function App(): React.JSX.Element {

  const longUrduText = "اِبتدائی لے آؤٹ، جو کہ وسیع پیمانے پر دنیا کے کئی ممالک میں استعمال ہوتا ہے۔ یہ ایڈیشن آیات کے کلاسیک مقامات قائم رکھتا ہے۔";

  return (
    <SafeAreaView style={styles.container}>
     <Button title="Click me" onPress={() => console.log('clicked')} />
     <View style={styles.footer}>
        <Text style={styles.text}>{longUrduText}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    // When using NotoNastaliqUrdu font and lineHeight with fixed height (or maxHeight) it causes a memory leak
    // there can be more instances of this, height is just an example we observed
    height: 60,
    backgroundColor: 'red',
  },
  text: {
    fontSize: 12,
    // Since NotoNastaliqUrdu font is really large, we need a 3 * fontSize lineHeight
    // the memory will keep increasing and the app will crash on iOS 
    // lineHeight: 36, // uncomment this line to reproduce the memory leak
    fontFamily: 'NotoNastaliqUrdu',
  },
});

export default App;