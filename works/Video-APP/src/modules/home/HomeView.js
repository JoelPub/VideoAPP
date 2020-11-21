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
      else {
        item.paused = false;
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
    const newVideos = [...videos];
    const {height} =  Dimensions.get("window");
    const scrollPosition = e.nativeEvent.contentOffset.y;
    Tts.stop();
    console.log('handleScroll');
    console.log("scrollPosition",scrollPosition);
      console.log("position.start",position.start);
      console.log("position.end",position.end);
    if(scrollPosition > position.start) {
      newVideos[position.current].paused=true;
      newVideos[position.current+1].paused=false;
      setPostion({start: position.end,end:position.end + height,current:position.current+1 });
      scrollViewRef.current.scrollTo({x: 0, y: position.end, animated: true});
      console.log('pagedown');
    } else if(scrollPosition < position.start) {
      newVideos[position.current].paused=true;
      newVideos[position.current-1].paused=false;
      setPostion({start: position.start - height,end:position.start,current:position.current-1 });
      scrollViewRef.current.scrollTo({x: 0, y: position.start - height, animated: true});
      console.log('pageup');
    }
    setVideos(newVideos);
    Tts.speak(videos[position.current][0].name);
    
  }

  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    var tmpVideos=[];
    setRefreshing(true);
    setLoading(true);
    setVideos([]);
    fetch('https://bitbucket.org/!api/2.0/snippets/JoelPub/aL5oEB/d057b69a5c252885bf95dae0c2dd13b7ab5d83ef/files/svglist.json')
      .then((response) => response.json())
      .then((json) => {
        json.list.map((ele,index) => {
          tmpVideos.push(ele.character);
        })
        setVideos(tmpVideos);
      })
      .catch((error) => console.error(error))
      .finally(() => {setLoading(false);setRefreshing(false);});
  }, []);


  useEffect(() => {
    var tmpVideos=[];
    fetch('https://bitbucket.org/!api/2.0/snippets/JoelPub/aL5oEB/2b95c304a5aff552468ecb9bd96eebcf269c83b3/files/svglist.json')
      .then((response) => response.json())
      .then((json) => {
        json.list.map((ele,index) => {
          tmpVideos.push(ele.character);
        })
        setVideos(tmpVideos);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
          {isLoading ? <ActivityIndicator/> : (
              
              <ScrollView onScrollEndDrag={handleScroll} ref={scrollViewRef} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
                {videos.map((video,index) => index==0?
                  <View key={index} style={{width:width, height:height}} onLayout={handleVideoLayout}>
                    {!video.paused&&<Menu bgcolor='white' ajaxData={video}/>}
                  </View>
                  :
                  <View key={index} style={{width:width, height:height}} >
                    {!video.paused&&<Menu bgcolor='white' ajaxData={video}/>}
                  </View>
                )}
            </ScrollView>  
            )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    
  }
});
