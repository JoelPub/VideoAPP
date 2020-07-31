/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , { useRef , useState }from 'react';
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
import LightVideo from "./one.mp4";
const App: () => React$Node = () => {
  const scrollViewRef = useRef();
  const [paused, setPaused] = useState(false);
  const [videoPos, setVideoPos] = useState({
    start:null,
    end:null
  });
  const [position, setPostion] = useState({
    start:null,
    end:null
  });
  const handleVideoLayout = (e)  => {
    setVideoPos({start: e.nativeEvent.layout.y,
      end:e.nativeEvent.layout.y + e.nativeEvent.layout.height });
    setPostion({start: e.nativeEvent.layout.y,
      end:e.nativeEvent.layout.y + e.nativeEvent.layout.height });
  }
  const handleScroll = (e) => {
    const {height} =  Dimensions.get("window");
    const scrollPosition = e.nativeEvent.contentOffset.y;
    if(scrollPosition > position.start) {
      scrollViewRef.current.scrollTo({x: 0, y: position.end, animated: true});
    } else if(scrollPosition < position.start) {
      scrollViewRef.current.scrollTo({x: 0, y: position.start - height, animated: true});
    }
  }
  const endScroll = (e) => {
    const {height} =  Dimensions.get("window");
    const scrollPosition = e.nativeEvent.contentOffset.y;
    if(scrollPosition >= videoPos.start && scrollPosition < videoPos.end && paused) {
      setPaused(false);
      setPostion({start: videoPos.start,end:videoPos.start + height });
    } else if((scrollPosition < videoPos.start || scrollPosition >= videoPos.end) && !paused) {
      setPaused(true);
      setPostion({start: videoPos.end,end:videoPos.end + height });
    }
    console.log(paused?'paused':'playing');
  }
  return (
    <>
          <SafeAreaView style={styles.container}>
            <ScrollView onMomentumScrollEnd={endScroll} onScrollEndDrag={handleScroll} ref={scrollViewRef}>
              <Video 
                repeat={false}
                source={one}
                paused={paused}
                onLayout={handleVideoLayout}
                resizeMode="cover"
                style={{width:width, height:height}}/>
              <View style={styles.fakeContent}>
                <Text>{paused?"Paused":"Playing"}</Text>
              </View>
            </ScrollView>  
          </SafeAreaView>
    </>
  );
};
const { height, width } = Dimensions.get("window");
const one = require('./one.mp4');
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  fakeContent: {
    height,
    alignItems: "center",
    paddingTop: height/2,
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
