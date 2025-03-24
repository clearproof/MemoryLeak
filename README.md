# Memory leak when using NotoNastaliqUrdu font with lineHeight and fixed height/maxHeight

## Environment Information
- React Native Version: 0.78.1
- Platform: iOS 
- Development OS: macOS Sequoia 15.3.2
- Xcode Version: 16.2
- Node Version: 22.13.1

## Description
When using the NotoNastaliqUrdu font with a combination of lineHeight and a fixed height/maxHeight container, a severe memory leak occurs on iOS. The memory usage continuously increases until the app freezes or crashes.

The issue appears to be related to text rendering when Urdu text with the NotoNastaliqUrdu font stretches beyond the fixed container boundaries. This specifically happens when lineHeight is applied to the text style and the container has a fixed height or maxHeight constraint (there can be more instances of this, height is just an example we observed).


## Steps to Reproduce
1. Clone the reproduction repository: https://github.com/clearproof/RNTextHeightMemoryLeak
2. Install dependencies: `npm install`
3. Run the app on iOS: `npm run ios`
4. Click the "Click me" button a few times and notice the app works fine initially
5. Uncomment line 42 in App.tsx (the lineHeight property)
6. Observe the app's memory usage continuously increasing in Xcode's Debug Navigator
7. The app will eventually become unresponsive and the "Click me" button cannot be clicked

## Code Example
```tsx
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
```

## Expected Behavior
The text should render properly within the container without causing any memory leaks. The app should maintain stable memory usage regardless of the combination of lineHeight and fixed height/maxHeight.

## Actual Behavior
When using NotoNastaliqUrdu font with lineHeight and a container with fixed height/maxHeight:
1. Memory usage continuously increases
2. The UI freezes immediately
3. Cannot reload the app
4. The app may crash if left running long enough

This issue is reproducible 100% of the time when the specified font, lineHeight, and fixed height/maxHeight are used together.

## Additional Information
- The issue only happens with the NotoNastaliqUrdu font, not with standard fonts
- Removing the lineHeight resolves the issue but font cannot be read properly
- This appears to be related to the complex text rendering required for the Nastaliq script in Urdu

This is blocking our application to adopt the NotoNastaliq font for Urdu-speaking users.

Any help resolving this issue would be greatly appreciated.