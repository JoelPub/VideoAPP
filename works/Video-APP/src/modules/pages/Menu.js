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
import * as path from 'svg-path-properties';  
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
const AnimatedG = Animated.createAnimatedComponent(G);

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
    log = (tag) => e => {
        var seq=0;
        this.state.parts.map((part,index) => {
            if(part.id==tag) {
                part.layout=e.nativeEvent.layout;
                seq=index;
            }
        })
        console.log(tag, this.state.parts[seq].layout);
        if( this.state.parts[1].position) {
            if(this.state.parts[0].position.bottom>0) {
                this.state.parts[1].position.y=this.state.parts[0].position.bottom-this.state.parts[1].layout.y;
                this.state.parts[0].position.bottom=0;
            }
            if(this.state.parts[1].position.bottom>0) {
                this.state.parts[2].position.y=this.state.parts[1].position.bottom-this.state.parts[2].layout.y;
                this.state.parts[1].position.bottom=0;
            }
        }
        this.setState({
          parts: this.state.parts
        })
    }

    handleOnPress = (someId) => event => {
      if(this.props.editable){
        console.log('show modal');
        this.props.setModal({show:true,fromPart:someId,toPart:this.props.modalData.toPart});
      }
      else {
        console.log('view only');
      }
    }
    
    componentDidUpdate(prevProps) {
      if (prevProps.modalData && prevProps.modalData.show !== this.props.modalData.show && !this.props.modalData.show) {
        console.log(this.props.modalData);
        if(this.props.modalData.fromPart==0) {
          this.state.parts[this.props.modalData.fromPart].d= this.state.parts[this.props.modalData.toPart+3].d;
        }
        else if(this.props.modalData.fromPart==1) {
            console.log(this.state.parts[0].position.bottom);
            this.state.parts[0].position.bottom=this.state.parts[0].layout.height+this.state.parts[0].layout.y;
            console.log(this.state.parts[0].position.bottom);
            this.state.parts[1].d= this.state.parts[4].d;
        }
        else if(this.props.modalData.fromPart==2) {
            console.log(this.state.parts[1].position.bottom);
            this.state.parts[1].position.bottom=this.state.parts[1].layout.height+this.state.parts[1].layout.y;
            console.log(this.state.parts[1].position.bottom);
            this.state.parts[2].d= this.state.parts[5].d;
        }
        //   console.log(event.nativeEvent)
        this.setState({
          parts: this.state.parts
        })
      }
    }

  componentDidMount() {
    var properties,length;
      this.props.ajaxData.map((part,index) =>
      {
          if(part.id!='replacement') {
            switch (part.id.substring(0,9)) {
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
            properties = path.svgPathProperties(part.d);
            length = properties.getTotalLength();
            part.text=part.name.repeat(length/190);
            console.log("part.name",part.name);
            console.log("length",length);
          }
          
      })
  }



  render() {
    const { initAnimHead ,initAnimFace,initAnimBody,initAnimLegs,parts } = this.state;
    return (
        <AnimatedSvg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ backgroundColor: this.props.bgcolor }}>
            <Defs>
                {parts.map((part,index) => 
                    part.id!='replacement'&&<Path id={part.id} d={part.d} key={index}/>
                )}
            </Defs>
                {parts.map((part,index) => 
                    part.id!='replacement'&&
                    <AnimatedG key={index} y={part.position?part.position.y:'0'} 
                        opacity={part.id.substring(0,9)=='path-head'?initAnimHead.interpolate({inputRange: [0, 1],outputRange: [0, 1],})
                                :part.id.substring(0,9)=='path-face'?initAnimFace.interpolate({inputRange: [0, 1],outputRange: [0, 1],})
                                :part.id.substring(0,9)=='path-body'?initAnimBody.interpolate({inputRange: [0, 1],outputRange: [0, 1],})
                                :initAnimLegs.interpolate({inputRange: [0, 1],outputRange: [0, 1],})
                                }
                    >
                        <Text fill={part.color} fontSize={part.fontSize} >
                            <TextPath href={`#${part.id}`} >
                            {part.text}
                            </TextPath>
                        </Text>
                        <Path fill="none" onLayout={this.log(part.id)}  stroke="black"  strokeWidth={part.strokeWidth} d={part.d} onPress={this.handleOnPress(index)}/>
                    </AnimatedG>
                )}
      </AnimatedSvg>
    );
  }
}
