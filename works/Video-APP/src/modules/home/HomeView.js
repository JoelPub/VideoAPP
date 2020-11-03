import React from 'react';

import { StyleSheet,  View } from "react-native";
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
export default function HomeScreen({ isExtended, setIsExtended }) {
  // const rnsUrl = 'https://reactnativestarter.com';
  // const handleClick = () => {
  //   Linking.canOpenURL(rnsUrl).then(supported => {
  //     if (supported) {
  //       Linking.openURL(rnsUrl);
  //     } else {
  //       console.log(`Don't know how to open URI: ${rnsUrl}`);
  //     }
  //   });
  // };

  return (
    <View style={styles.container}>
        
    <Svg height="1000" width="2000">
      <Defs>
        <Path id="path" d="M250 150 L150 350 L350 350 Z" />
      </Defs>
      <G y="20">
        <Text fill="blue">
          <TextPath href="#path" startOffset="-10%">
            We go up and down,asdfadsfasdfasdfasdfasdfasdfasdfadssdafasdfasdfasdfasdfasdfsadfasdfasdfsadfdsaasdfasdfdssdfasdfsdafsadfassdaf
            <TSpan fill="red" dy="5,5,5">
              then up again
            </TSpan>
          </TextPath>
        </Text>
        <Path d="M250 150 L150 350 L350 350 Z" fill="none" stroke="blue" strokeWidth="0" />
      </G>
    </Svg>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  }
});
