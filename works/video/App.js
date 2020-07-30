/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Video from 'react-native-video';
import LightVideo from "./one.mp4";
const App: () => React$Node = () => {
  return (
    <>
          <SafeAreaView style={{
                                flex:1,
                              }}>
            <Video source={LightVideo}
             resizeMode="cover"
             style={{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     bottom: 0,
                     right: 0
                   }}/>
          </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});

export default App;
