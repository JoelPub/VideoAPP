/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , { useState }from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Video from 'react-native-video';
import LightVideo from "./three.mp4";
const App: () => React$Node = () => {
  const [paused, setPaused] = useState(true);
  const [position, setPostion] = useState({
    start:null,
    end:null
  });
  const handleVideoLayout = (e)  => {
    const {height} =  Dimensions.get("window");
    setPostion({start: e.nativeEvent.layout.y,
      end:e.nativeEvent.layout.y + height + e.nativeEvent.layout.height });
  }
  const handleScroll = (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    if(scrollPosition > position.start && scrollPosition < position.end && paused) {
      setPaused(false);
    } else if((scrollPosition < position.start || scrollPosition > position.end) && !paused) {
      setPaused(true);
    }
    console.log(paused?'paused':'playing');
  }
  return (
    <>
          <SafeAreaView style={styles.container}>
            <ScrollView scrollEventThrottle={16} onScroll={handleScroll}>
              <View style={styles.fakeContent}>
                <Text>{paused?"Paused":"Playing"}</Text>
              </View>
              <Video 
                repeat={false}
                source={LightVideo}
                paused={paused}
                onLayout={handleVideoLayout}
                resizeMode="cover"
                style={{width, height:300}}/>
              <View style={styles.fakeContent}>
                <Text>{paused?"Paused":"Playing"}</Text>
              </View>
            </ScrollView>  
          </SafeAreaView>
    </>
  );
};
const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  fakeContent: {
    height,
  },
  fillWindow : {
     position: 'absolute',
     top: 0,
     left: 0,
     bottom: 0,
     right: 0
   }
});

export default App;
