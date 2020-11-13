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
        initAnim: new Animated.Value(0),
        initAnim1: new Animated.Value(0),
        initAnim2: new Animated.Value(0),
        parts:this.props.ajaxData,
    };

  componentDidMount() {
    fadeIn(this.state.initAnim,5000);
    fadeIn(this.state.initAnim1,8000);
    fadeIn(this.state.initAnim2,11000);
  }



  render() {
    const { initAnim ,initAnim1,initAnim2,parts } = this.state;
    return (
        <AnimatedSvg width={width} height={height-100} viewBox="0 0 600 1300" style={{ backgroundColor: this.props.bgcolor }}>
            <Defs>
                {parts.map((part,index) => 
                    <Path id={part.id} d={part.d} key={index}/>
                )}
                <Path id="patha" d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z" />
                
            </Defs>
            <AnimatedG 
                y={initAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1000, 1000],
                })}
                x={initAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [600, 600],
                })}
                opacity={initAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                })}
            >
                <Text fill="blue" fontSize="150" scale="0.2" rotation="180">
                    <TextPath href="#path" >
                    {parts[0].text}
                    </TextPath>
                </Text>
                <Path fill="none" stroke="black" strokeWidth="10" d={parts[0].d} scale="0.2" rotation="180"/>
            </AnimatedG>
            <AnimatedG 
                y={initAnim1.interpolate({
                inputRange: [0, 1],
                outputRange: [1000, 1000],
                })}
                x={initAnim1.interpolate({
                inputRange: [0, 1],
                outputRange: [600, 600],
                })}
                opacity={initAnim1.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                })}
            >
                <Text fill="blue" fontSize="50" scale="0.2" rotation="180">
                    <TextPath href="#path1" >
                    蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓
                    </TextPath>
                </Text>
            </AnimatedG>
            <AnimatedG 
                y={initAnim1.interpolate({
                inputRange: [0, 1],
                outputRange: [1000, 1000],
                })}
                x={initAnim1.interpolate({
                inputRange: [0, 1],
                outputRange: [600, 600],
                })}
                opacity={initAnim1.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                })}
            >
                <Text fill="blue" fontSize="50" scale="0.2" rotation="180">
                    <TextPath href="#path2" >
                    蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓
                    </TextPath>
                </Text>
            </AnimatedG>
            <AnimatedG 
                y={initAnim2.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1000],
                })}
                x={initAnim2.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 600],
                })}
                opacity={initAnim2.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                })}
            >
                <Text fill="blue" fontSize="50" scale="0.2" rotation="180">
                    <TextPath href="#path3" >
                    蜡笔小新的眉毛蜡笔小新的眉毛蜡笔小新的眉毛蜡笔小新的眉毛蜡笔小新的眉毛
                    </TextPath>
                </Text>
            </AnimatedG>
            <AnimatedG 
                y={initAnim2.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1000],
                })}
                x={initAnim2.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 600],
                })}
                opacity={initAnim2.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                })}
            >
                <Text fill="blue" fontSize="50" scale="0.2" rotation="180">
                    <TextPath href="#path4" >
                    蜡笔小新的眉毛蜡笔小新的眉毛蜡笔小新的眉毛蜡笔小新的眉毛蜡笔小新的眉毛
                    </TextPath>
                </Text>
            </AnimatedG>
            <AnimatedG 
                y={initAnim1.interpolate({
                inputRange: [0, 1],
                outputRange: [1000, 1000],
                })}
                x={initAnim1.interpolate({
                inputRange: [0, 1],
                outputRange: [600, 600],
                })}
                opacity={initAnim1.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                })}
            >
                <Text fill="blue" fontSize="50" scale="0.2" rotation="180">
                    <TextPath href="#path5" >
                    蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓
                    </TextPath>
                </Text>
            </AnimatedG>

            
            <AnimatedG 
                y={initAnim1.interpolate({
                inputRange: [0, 1],
                outputRange: [1000, 1000],
                })}
                x={initAnim1.interpolate({
                inputRange: [0, 1],
                outputRange: [600, 600],
                })}
                opacity={initAnim1.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                })}
            >
                <Text fill="blue" fontSize="50" scale="0.2" rotation="180">
                    <TextPath href="#path6" >
                    蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓蜡笔小新的轮廓
                    </TextPath>
                </Text>
            </AnimatedG>
            <AnimatedG 
                translate={initAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100],
                })}
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
                <Text fill="blue" fontSize="20">
                <TextPath href="#patha" >
                We go up and down,asdfadsfasdfasdfasdfasdfasdfasdfadssdafasdfasdfasdfasdfasdfsadfasdfasdfsadfdsaasdfasdfdssdfasdfsdafsadfassdaffjghfgfjhfgfjgfjgfgjhfjgfghjfhjfgjfjgfgjhfjfgjfjhfgjfjgfgjffdjgfghfhgfjgfgjfgfjhgfgjhfghjfghfjf
                </TextPath>
                </Text>
            </AnimatedG>
      </AnimatedSvg>
    );
  }
}
