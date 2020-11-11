import React, { Component } from "react";
import { Animated, Dimensions } from "react-native";
const AnimatedG = Animated.createAnimatedComponent(G);

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
  
const { width, height } = Dimensions.get("window");
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
export default class Menu extends Component {
    state = {
        initAnim: new Animated.Value(0),
    };

  componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.initAnim,
      {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }
    ).start();
  }



  render() {
    const { initAnim } = this.state;
    return (
        <AnimatedSvg width={width} height={height/2} viewBox="0 0 600 1300" style={{ backgroundColor: '#f9bdad' }}>
            <Defs>
                <Path id="path" d="M250 150 L150 350 L350 350 Z" />
                <Path id="patha" d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z" />
            </Defs>
            <AnimatedG 
                translate={initAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100],
                })}
            >
                <Text fill="blue" fontSize="40">
                <TextPath href="#path" >
                    We go up and down,asdfadsfasdfasdfasdfasdfasdfasdfadssdafasdfasdfasdfasdfasdfsadfasdfasdfsadfdsaasdfasdfdssdfasdfsdafsadfassdaf
                </TextPath>
                </Text>
            </AnimatedG>
            <AnimatedG 
                x={initAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 80],
                })} 
                y={initAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 180],
                })} 
                rotation={initAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 80],
                })}
                scale={initAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                })}
            >
                <Text fill="blue" fontSize="80">
                <TextPath href="#patha" >
                We go up and down,asdfadsfasdfasdfasdfasdfasdfasdfadssdafasdfasdfasdfasdfasdfsadfasdfasdfsadfdsaasdfasdfdssdfasdfsdafsadfassdaffjghfgfjhfgfjgfjgfgjhfjgfghjfhjfgjfjgfgjhfjfgjfjhfgjfjgfgjffdjgfghfhgfjgfgjfgfjhgfgjhfghjfghfjf
                </TextPath>
                </Text>
            </AnimatedG>
      </AnimatedSvg>
    );
  }
}
