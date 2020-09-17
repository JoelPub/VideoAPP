import React , { useRef , useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions
} from 'react-native';
import Video from 'react-native-video';
export default function HomeScreen({ isExtended, setIsExtended }) {
  const scrollViewRef = useRef();
  const [paused, setPaused] = useState(false);
  const [position, setPostion] = useState({
    start:null,
    end:null
  });
  const [videos, setVideos] = useState([
    {id:0,path:require('./one.mp4'),paused:false,start:0,end:0,style:'cover'},
    {id:1,path:require('./two.mp4'),paused:false,start:0,end:0,style:'cover'},
    {id:2,path:require('./three.mp4'),paused:false,start:0,end:0,style:'contain'}]);
  const handleVideoLayout = (e)  => {
    const newVideos = [...videos];
    newVideos.map((item,index) =>{
      item.start = e.nativeEvent.layout.height * index;
      item.end = e.nativeEvent.layout.height * (index + 1);
      if((e.nativeEvent.layout.y < item.start || e.nativeEvent.layout.y >= item.end) && !item.paused) {
        item.paused = true;
      }
    });
    setVideos(newVideos);
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
    const newVideos = [...videos];
    newVideos.map((item,index) => {
      if(scrollPosition >= item.start && scrollPosition < item.end && item.paused) {
        item.paused = false;
        setPostion({start: item.start,end:item.start + height });
      } else if((scrollPosition < item.start || scrollPosition >= item.end) && !item.paused) {
        item.paused = true;
        //setPostion({start: item.end,end:item.end + height });
      }
    });
    setVideos(newVideos);
  }

  const { height, width } = Dimensions.get("window");
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

  return (
    <SafeAreaView style={styles.container}>
            <ScrollView onMomentumScrollEnd={endScroll} onScrollEndDrag={handleScroll} ref={scrollViewRef}>
            {videos.map((video) =>  video.id==0?
                                            <Video 
                                            repeat={false}
                                            source={video.path}
                                            paused={video.paused}
                                            onLayout={handleVideoLayout}
                                            resizeMode={video.style}
                                            style={{width:width, height:height}}
                                            key={video.id}/>
                                            :
                                            <Video 
                                              repeat={false}
                                              source={video.path}
                                              paused={video.paused}
                                              resizeMode={video.style}
                                              style={{width:width, height:height}}
                                              key={video.id}/>
                                            )}
            </ScrollView>  
    </SafeAreaView>
  );
}
