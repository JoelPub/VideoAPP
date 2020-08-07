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
  ToastAndroid,
} from 'react-native';
import Video from 'react-native-video';
import LightVideo from "./one.mp4";
var RNFS = require('react-native-fs');
const App: () => React$Node = () => {
  const scrollViewRef = useRef();
  const [paused, setPaused] = useState(false);
  const [position, setPostion] = useState({
    start:null,
    end:null
  });
  const [videos, setVideos] = useState([
    {id:0,path:require('./one.mp4'),paused:false,start:0,end:0,style:'cover'},
    {id:1,path:require('./two.mp4'),paused:false,start:0,end:0,style:'cover'},
    {id:2,path:require('./three.mp4'),paused:false,start:0,end:0,style:'contain'}
    ]);
  const handleVideoLayout = (e)  => {
    let newVideos = [...videos];
    const localVideo = 'file:///storage/emulated/0/Android/data/com.video/files/four.mp4';
    newVideos = [...newVideos,
      {id:3,path:{ uri: localVideo },paused:false,start:0,end:0,style:'cover'}
    ]
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


//  let dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath ; 
//  //外部文件，共享目录的绝对路径（仅限android）
//  const downloadDest = `${dirs}/four.mp4`;
//  //下载地址
//  const formUrl = 'https://stszjl.aoscdn.com/app/lightmv/resources/3d2501f009e8e837cae0e7ddee792483/mv/45223b1c6c0e67730cd498f88431b4bf-360-water.mp4?auth_key=1596801575-661239-167811-4f1e65d62cf2fc3b44609a2efb85d6df&Expires=1596801575';
//    
//  const options = {
//    fromUrl: formUrl,
//    toFile: downloadDest,
//    background: true,
//    begin: (res) => {
//      ToastAndroid.show('开始下载',ToastAndroid.SHORT)
//      console.log('begin', res);
//      console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
//    },
//    progress: (res) => { //下载进度
//      let pro = res.bytesWritten / res.contentLength;
//      console.log('pro==',pro)
//    }
//  }
//  try {
//    const ret = RNFS.downloadFile(options);
//    ret.promise.then(res => {
//      console.log('success', res);
//      console.log('file://' + downloadDest)
//      RNFS.readDir(dirs) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
//      .then((result) => {
//        console.log('GOT RESULT', result);
//  
//        // stat the first file
//        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
//      })
//      .then((statResult) => {
//        if (statResult[0].isFile()) {
//          // if we have a file, read it
//          return RNFS.readFile(statResult[1], 'utf8');
//        }
//  
//        return 'no file';
//      })
//      .then((contents) => {
//        // log the file contents
//        console.log(contents);
//      })
//      .catch((err) => {
//        console.log(err.message, err.code);
//      });
//    }).catch(err => {
//        console.log('err', err);
//    });
//  }catch (e) {
//    ToastAndroid.show('下载失败',ToastAndroid.SHORT)
//    console.log(error);
//  }
  return (
    <>
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
