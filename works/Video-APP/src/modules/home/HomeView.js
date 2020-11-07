import React, { useRef, useState } from 'react';

import { 
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

export default function HomeScreen({ isExtended, setIsExtended }) {
  const { height, width } = Dimensions.get("window");

  const fadeIn = (n) => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(videos[n].fadeAnim, {
      toValue: 1,
      duration: 5000
    }).start();
  };
  const fadeOut = (n) => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(videos[n].fadeAnim, {
      toValue: 0,
      duration: 0
    }).start();
  };
  const [videos, setVideos] = useState([
    {id:0,fadeAnim:useRef(new Animated.Value(0)).current,paused:false,start:0,y:"300",transform:"translate(0.000000,261.000000) scale(0.200000,-0.200000)",fontsize:"100",
      name:"圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人",
      d:"M861 2415 c-85 -30 -168 -76 -255 -143 -68 -52 -213 -193 -269 -261 l-37 -45 -39 22 c-101 57 -211 2 -242 -121 -11 -44 -10 -50 8 -70 11 -12 23 -35 27 -50 8 -35 50 -54 137 -62 73 -7 112 7 117 42 2 12 14 29 28 37 14 10 24 26 24 41 0 20 7 26 43 35 23 6 48 13 55 15 7 3 12 -5 12 -22 0 -43 38 -110 85 -150 42 -36 44 -40 36 -75 -5 -21 -5 -55 0 -75 5 -21 9 -41 9 -45 0 -3 -23 -21 -51 -38 -78 -48 -155 -131 -189 -202 -37 -78 -39 -108 -7 -108 22 0 22 -2 22 -128 0 -123 1 -129 32 -193 54 -109 158 -186 305 -225 70 -18 81 -18 74 4 -3 9 6 1 21 -18 78 -100 180 -168 294 -195 66 -15 259 -21 259 -7 0 4 -9 13 -20 19 -10 7 -24 21 -29 32 -9 17 -1 24 83 65 237 118 389 273 436 446 7 25 14 51 16 59 4 11 10 9 27 -8 13 -11 26 -21 29 -21 12 0 -22 143 -48 200 -29 64 -87 125 -129 136 -19 5 -24 11 -19 23 15 37 16 64 0 105 -13 33 -14 50 -6 70 14 37 12 96 -4 124 -11 20 -9 30 12 70 21 41 23 57 20 127 -5 97 -30 150 -86 187 -23 16 -52 49 -70 81 -111 197 -313 318 -567 341 -60 5 -81 2 -144 -19z m314 -25 c156 -49 288 -146 369 -272 20 -31 36 -59 36 -62 0 -3 -24 6 -52 19 -114 52 -226 77 -365 82 -151 6 -249 -5 -408 -47 -187 -50 -205 -59 -242 -126 -18 -33 -33 -66 -33 -74 -1 -28 -17 -41 -68 -54 -54 -15 -62 -11 -62 33 0 10 -9 30 -21 45 l-21 26 50 58 c159 183 338 322 486 379 53 20 74 23 161 19 64 -3 125 -12 170 -26z m185 -271 c125 -31 286 -111 317 -158 32 -48 46 -107 40 -172 -4 -45 -25 -107 -42 -127 -2 -2 -43 10 -92 26 -160 55 -240 67 -433 66 -193 0 -305 -18 -460 -73 l-80 -28 -45 40 c-60 52 -78 89 -78 158 0 45 6 68 34 119 39 71 58 81 226 126 223 60 432 67 613 23z m-1090 -151 c48 -30 55 -38 67 -83 17 -68 16 -92 -5 -107 -10 -7 -25 -26 -33 -43 -14 -29 -17 -30 -86 -33 -93 -4 -138 14 -148 57 -4 17 -16 37 -27 45 -19 14 -19 16 -4 68 15 51 60 108 96 121 40 14 88 6 140 -25z m1025 -228 c50 -6 129 -20 178 -31 83 -20 87 -22 87 -48 0 -44 -29 -141 -57 -192 l-26 -48 -26 18 c-30 21 -93 41 -133 41 -18 0 -28 5 -28 14 0 8 -11 28 -25 45 l-26 30 34 -6 c28 -4 37 -1 55 22 30 38 29 89 -3 120 -29 30 -54 32 -83 5 -28 -27 -37 -65 -23 -97 7 -14 10 -27 8 -29 -1 -2 -20 2 -41 8 -26 8 -49 9 -74 2 l-37 -10 -3 36 c-5 71 -78 83 -95 15 -3 -14 -5 -11 -6 10 -1 38 24 75 51 75 35 0 58 -29 59 -74 0 -36 2 -38 11 -19 8 16 6 30 -8 60 -37 75 -124 48 -124 -37 0 -46 39 -96 66 -86 11 4 10 -2 -5 -20 -12 -15 -21 -33 -21 -40 0 -9 -12 -14 -35 -14 -39 0 -100 -22 -126 -46 -15 -14 -19 -12 -39 16 -31 43 -60 132 -60 183 l0 44 68 16 c174 42 335 54 487 37z m24 -46 c12 -15 21 -41 21 -58 l-1 -31 -14 33 c-11 26 -20 32 -44 32 -23 0 -34 -7 -45 -27 -18 -32 -21 -17 -6 24 12 30 36 53 56 53 7 0 22 -12 33 -26z m-591 -51 c2 -62 12 -95 48 -160 l33 -63 -22 -11 c-39 -22 -103 -17 -131 10 -44 42 -73 169 -46 211 7 12 84 46 111 49 3 1 6 -16 7 -36z m921 8 c44 -20 58 -64 41 -130 -18 -71 -40 -110 -71 -126 -35 -19 -61 -19 -105 0 l-35 14 26 38 c30 45 65 151 65 200 0 38 7 38 79 4z m-599 -42 c0 -20 -8 -23 -34 -13 -19 7 -21 40 -3 47 17 6 37 -12 37 -34z m250 16 c15 -18 5 -35 -20 -35 -10 0 -22 5 -25 10 -7 11 12 40 25 40 4 0 13 -7 20 -15z m-66 -56 c-2 -4 5 -14 16 -24 28 -25 34 -68 15 -104 -39 -77 -167 -89 -227 -21 -39 43 -37 83 7 127 34 34 35 35 114 31 43 -2 77 -6 75 -9z m-234 -107 c0 -45 79 -101 144 -102 45 0 114 38 132 72 15 29 18 30 74 26 55 -4 72 -12 132 -59 16 -13 46 -24 78 -27 49 -4 52 -3 89 36 44 46 51 41 51 -34 0 -38 -6 -51 -41 -89 l-42 -45 29 0 28 0 -35 -25 c-51 -38 -130 -58 -196 -50 -61 7 -167 41 -229 73 l-41 21 -74 -29 c-105 -40 -229 -64 -301 -56 -80 8 -212 76 -148 76 20 0 18 4 -15 42 -41 49 -50 75 -42 125 7 41 17 55 25 33 3 -8 18 -27 33 -42 45 -45 114 -37 187 22 56 44 162 66 162 32z m-418 -38 c-12 -47 -3 -79 34 -123 l36 -41 -29 0 -28 -1 30 -25 c84 -70 207 -93 334 -60 34 9 66 16 71 16 4 0 31 -32 60 -70 79 -106 102 -105 177 10 l37 58 41 -15 c113 -40 237 -24 311 42 37 32 38 34 15 35 l-24 0 23 26 c18 19 31 24 49 19 68 -17 117 -84 150 -205 26 -94 26 -98 -3 -70 l-25 23 -6 -29 c-44 -219 -177 -372 -433 -500 -64 -33 -119 -60 -121 -62 -3 -1 11 -18 29 -37 l34 -35 -80 0 c-204 1 -350 71 -450 216 l-39 57 -5 -31 -5 -30 -71 22 c-162 52 -258 136 -295 258 -19 61 -21 86 -16 174 l6 104 -25 0 c-13 0 -24 6 -24 13 0 28 62 139 102 183 39 42 138 118 145 111 1 -2 -1 -17 -5 -33z m639 -225 c43 -21 48 -46 8 -41 -13 2 -51 4 -83 5 -70 3 -82 18 -29 40 50 21 57 21 104 -4z m-12 -70 c36 -13 37 -16 13 -45 -31 -38 -51 -38 -89 2 -26 28 -31 39 -21 45 18 12 59 11 97 -2z"},
    {id:1,fadeAnim:useRef(new Animated.Value(0)).current,paused:false,start:0,y:"20",transform:"translate(0.000000,0.000000) scale(1.000000,1.000000)",fontsize:"20",
      name:"短发放大是否打算发达的说法定时发送到发顺丰大是大非",
      d:"M250 150 L150 350 L350 350 Z"},
    {id:2,fadeAnim:useRef(new Animated.Value(0)).current,paused:false,start:0,y:"20",transform:"translate(0.000000,0.000000) scale(1.000000,1.000000)",fontsize:"20",
      name:"从v下次v接纳君sad剋；女；阿斯顿加拿大籍奋斗；是风口浪尖大煞风景啊；大煞风景",
      d:"M153 334 C153 334 151 334 151 334 C151 339 153 344 156 344 C164 344 171 339 171 334 C171 322 164 314 156 314 C142 314 131 322 131 334 C131 350 142 364 156 364 C175 364 191 350 191 334 C191 311 175 294 156 294 C131 294 111 311 111 334 C111 361 131 384 156 384 C186 384 211 361 211 334 C211 300 186 274 156 274"}
  ]);
  const scrollViewRef = useRef();
  const [paused, setPaused] = useState(false);
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
    fadeIn(position.current);
    Tts.setDefaultLanguage('zh-CN');
    Tts.speak(videos[position.current].name);
    Tts.voices().then(voices => console.log(voices));
    console.log(position.current);
  }
  const handleScroll = (e) => {
    fadeOut(position.current);
    Tts.stop();
    const {height} =  Dimensions.get("window");
    const scrollPosition = e.nativeEvent.contentOffset.y;
    if(scrollPosition > position.start) {
      scrollViewRef.current.scrollTo({x: 0, y: position.end, animated: true});
      setPostion({start: position.start,
      end:position.end,
      current:position.current+1 });
    } else if(scrollPosition < position.start) {
      scrollViewRef.current.scrollTo({x: 0, y: position.start - height, animated: true});
      setPostion({start: position.start,
      end:position.end,
      current:position.current-1 });
    }
    
    
  }
  const endScroll = (e) => {
    const {height} =  Dimensions.get("window");
    const scrollPosition = e.nativeEvent.contentOffset.y;
    const newVideos = [...videos];
    newVideos.map((item,index) => {
      if(scrollPosition >= item.start && scrollPosition < item.end && item.paused) {
        item.paused = false;
        setPostion({start: item.start,end:item.start + height,current:position.current });
      } else if((scrollPosition < item.start || scrollPosition >= item.end) && !item.paused) {
        item.paused = true;
      }
    });
    setVideos(newVideos);
    fadeIn(position.current);
    Tts.speak(videos[position.current].name);
    Tts.voices().then(voices => console.log(voices));
    console.log(position.current);
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onMomentumScrollEnd={endScroll} onScrollEndDrag={handleScroll} ref={scrollViewRef}>
      {videos.map((video) => video.id==0?
        <View key={video.id} style={{width:width, height:height}} onLayout={handleVideoLayout}>
          <Animated.View style={[{width: 20, height: 50},{opacity: video.fadeAnim}]}>
            <Svg height="500" width="500">
              <Defs>
                <Path id="path" d={video.d} />
              </Defs>
              <G y={video.y} transform={video.transform}>
                <Text fill="black" fontSize={video.fontsize} fontWeight="bold" >
                  <TextPath href="#path" >{video.name}</TextPath>
                </Text>
                <Path d={video.d} fill="none" stroke="black" strokeWidth="1" />
              </G>
            </Svg>
          </Animated.View>
        </View>
        :
        <View key={video.id} style={{width:width, height:height}} >
          <Animated.View style={[{width: 20, height: 50},{opacity: video.fadeAnim}]}>
            <Svg height="500" width="500">
              <Defs>
                <Path id="path" d={video.d} />
              </Defs>
              <G y={video.y} transform={video.transform}>
                <Text fill="black" fontSize={video.fontsize} fontWeight="bold" >
                  <TextPath href="#path" >{video.name}</TextPath>
                </Text>
                <Path d={video.d} fill="none" stroke="black" strokeWidth="1" />
              </G>
            </Svg>
          </Animated.View>
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
