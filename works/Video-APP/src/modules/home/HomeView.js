import React, { useEffect, useRef, useState } from 'react';

import { 
  RefreshControl,
  ActivityIndicator, 
  Dimensions,
  SafeAreaView,
  ScrollView,
  Animated, 
  StyleSheet,  
  View
} from "react-native";
import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import Tts from 'react-native-tts';
import Menu from "../pages/Menu";


export default function HomeScreen({ isExtended, setIsExtended }) {
  const { height, width } = Dimensions.get("window");

  const [videos, setVideos] = useState([]);
  const scrollViewRef = useRef();
  const [position, setPostion] = useState({
    start:null,
    end:null,
    current:0
  });
  const handleVideoLayout = (e)  => {
    let newVideos = [...videos];
    const layout = e.nativeEvent.layout;
    newVideos.map((item,index) =>{
      item.start = layout.height * index;
      item.end = layout.height * (index + 1);
      if((layout.y < item.start || layout.y >= item.end) && !item.paused) {
        item.paused = true;
      }
    });
    setVideos(newVideos);
    setPostion({start: layout.y,
      end:layout.y + layout.height,
      current:0 });
    Tts.setDefaultLanguage('zh-CN');
    Tts.speak(videos[position.current][0].name);
    //Tts.voices().then(voices => console.log(voices));
    console.log('handleVideoLayout',position.current);
  }
  const handleScroll = (e) => {
    console.log('handleScroll');
    Tts.stop();
    const {height} =  Dimensions.get("window");
    const scrollPosition = e.nativeEvent.contentOffset.y;
    if(scrollPosition > position.start) {
      scrollViewRef.current.scrollTo({x: 0, y: position.end, animated: true});
      console.log('pagedown');
    } else if(scrollPosition < position.start) {
      scrollViewRef.current.scrollTo({x: 0, y: position.start - height, animated: true});
      console.log('pageup');
    }
    
    
  }
  const endScroll = (e) => {
    console.log('endScroll');
    const {height} =  Dimensions.get("window");
    const scrollPosition = e.nativeEvent.contentOffset.y;
    const newVideos = [...videos];
    newVideos.map((item,index) => {
      if(scrollPosition >= item.start && scrollPosition < item.end && item.paused) {
        item.paused = false;
        setPostion({start: item.start,end:item.start + height,current:index });
      } else if((scrollPosition < item.start || scrollPosition >= item.end) && !item.paused) {
        item.paused = true;
      }
    });
    setVideos(newVideos);
    Tts.speak(videos[position.current][0].name);
    //Tts.voices().then(voices => console.log(voices));
    console.log(position.current);
  }


  
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    setVideos([]);
    fetch('https://bitbucket.org/!api/2.0/snippets/JoelPub/aL5oEB/b4cc5fd754d76dedab1c7e7b2d203679128d3f7c/files/svglist.json')
      .then((response) => response.json())
      .then((json) => {
        json.list.map((ele,index) => {
          setVideos([...videos,ele.character]);
        })})
      .catch((error) => console.error(error))
      .finally(() => {setLoading(false);setRefreshing(false);});
  }, []);


  useEffect(() => {
    fetch('https://bitbucket.org/!api/2.0/snippets/JoelPub/aL5oEB/b4cc5fd754d76dedab1c7e7b2d203679128d3f7c/files/svglist.json')
      .then((response) => response.json())
      .then((json) => {
        json.list.map((ele,index) => {
          setVideos([...videos,ele.character]);
        })
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onMomentumScrollEnd={endScroll} onScrollEndDrag={handleScroll} ref={scrollViewRef} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      {videos.map((video,index) => index==0?
        <View key={index} style={{width:width, height:height}} onLayout={handleVideoLayout}>
          {isLoading ? <ActivityIndicator/> : (
              <Menu bgcolor='white' ajaxData={video}/>
            )}
        </View>
        :
        <View key={index} style={{width:width, height:height}} >
          {isLoading ? <ActivityIndicator/> : (
              <Menu bgcolor='white' ajaxData={video}/>
            )}
        </View>
      )}
      </ScrollView>  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    
  }
});
