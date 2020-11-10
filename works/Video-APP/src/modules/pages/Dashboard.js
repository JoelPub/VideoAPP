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
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
export default class Dashboard extends Component {
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
    let animateWidth = initAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0', '80'],
    });
    return (
        <AnimatedSvg width={width} height={height/4} viewBox="0 0 100 100">
            <AnimatedRect
                x="15"
                y="15"
                width={animateWidth}
                height="20"
                stroke="red"
                strokeWidth="2"
                fill="yellow"
            />
      </AnimatedSvg>
    );
  }
}
