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

const fadeIn = (n,duration) => {
  // Will change fadeAnim value to 1 in 5 seconds
  Animated.timing(n, {
    toValue: 1,
    duration: duration,
    useNativeDriver: false,
  }).start();
};
const fadeOut = (n) => {
  // Will change fadeAnim value to 0 in 5 seconds
  Animated.timing(n, {
    toValue: 0,
    duration: 100,
    useNativeDriver: false,
  }).start();
};
export default class Menu extends Component {
    constructor(props){
        super(props);
    };
    state = {
        initAnimHead: new Animated.Value(0),
        initAnimFace: new Animated.Value(0),
        initAnimBody: new Animated.Value(0),
        initAnimLegs: new Animated.Value(0),
        parts:this.props.ajaxData,
    };

  componentDidMount() {
      this.props.ajaxData.map((part,index) =>
      {
          switch (part.id) {
            case 'path-head':
                fadeIn(this.state.initAnimHead,part.delay);
            break;
            case 'path-face':
                fadeIn(this.state.initAnimFace,part.delay);
            break;
            case 'path-body':
                fadeIn(this.state.initAnimBody,part.delay);
            break;
            case 'path-legs':
                fadeIn(this.state.initAnimLegs,part.delay);
            break;
            default:
                fadeIn(this.state.initAnimHead,part.delay);
          }
          
      })
  }



  render() {
    const { initAnimHead ,initAnimFace,initAnimBody,initAnimLegs,parts } = this.state;
    return (
        <AnimatedSvg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ backgroundColor: this.props.bgcolor }}>
            <Defs>
                {parts.map((part,index) => 
                    <Path id={part.id} d={part.d} key={index}/>
                )}
            </Defs>
                {parts.map((part,index) => 
                    <AnimatedG key={index}
                        opacity={part.id=='path-head'?initAnimHead.interpolate({inputRange: [0, 1],outputRange: [0, 1],})
                                :part.id=='path-face'?initAnimFace.interpolate({inputRange: [0, 1],outputRange: [0, 1],})
                                :part.id=='path-body'?initAnimBody.interpolate({inputRange: [0, 1],outputRange: [0, 1],})
                                :initAnimLegs.interpolate({inputRange: [0, 1],outputRange: [0, 1],})
                                }
                    >
                        <Text fill="black" fontSize={part.fontSize} >
                            <TextPath href={`#${part.id}`} >
                            {part.text}
                            </TextPath>
                        </Text>
                        <Path fill="none" stroke="black"  strokeWidth={part.strokeWidth} d={part.d} />
                    </AnimatedG>
                )}
      </AnimatedSvg>
    );
  }
}
