import React, { Component } from "react";
import { Animated, Dimensions } from "react-native";

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
const AnimatedG = Animated.createAnimatedComponent(G);
export default class Menu extends Component {
    state = {
      anim: new Animated.Value(0),
    };

  componentDidMount() {
    this.animate(this.props.value);
  }

  componentDidUpdate({ value }) {
    this.animate(value);
  }

  animate = value =>
    Animated.timing(this.state.anim, {
      useNativeDriver: true,
      duration: 4000,
      toValue: value,
    }).start();



  render() {
    const { anim } = this.state;
    return (
        <AnimatedSvg width={width} height={height/2} viewBox="0 0 400 400">
            <Defs>
                <Path id="path" d="M250 150 L150 350 L350 350 Z" />
            </Defs>
            <AnimatedG
            style={{
                opacity: anim,
            }}>
                <Text fill="blue">
                <TextPath href="#path" startOffset="-10%">
                    We go up and down,asdfadsfasdfasdfasdfasdfasdfasdfadssdafasdfasdfasdfasdfasdfsadfasdfasdfsadfdsaasdfasdfdssdfasdfsdafsadfassdaf
                </TextPath>
                </Text>
                <Path d="M250 150 L150 350 L350 350 Z" fill="none" stroke="blue" strokeWidth="1" />
            </AnimatedG>
        </AnimatedSvg>

    );
  }
}
