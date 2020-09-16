import React from 'react';
import {
  SafeAreaView
} from 'react-native';
import Video from 'react-native-video';
import LightVideo from "./one.mp4";
export default function HomeScreen({ isExtended, setIsExtended }) {
  return (
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
  );
}
