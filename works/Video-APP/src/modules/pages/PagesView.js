import React, { useEffect, useState }  from 'react';
import { RefreshControl,ActivityIndicator, Dimensions,SafeAreaView,ScrollView,StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import { colors, fonts } from '../../styles';

import Menu from "./Menu";
import Modalpage from "./Modal";
const calendarIcon = require('../../../assets/images/pages/calendar.png');
const galleryIcon = require('../../../assets/images/pages/gallery.png');
const videoIcon = require('../../../assets/images/pages/chart.png');
const componentsIcon = require('../../../assets/images/pages/chat.png');
const gridsIcon = require('../../../assets/images/tabbar/grids.png');
const { height, width } = Dimensions.get("window");
export default PagesScreen = (props) =>{
  const [isLoading, setLoading] = useState(true);
  const [modalData, setModal] = useState({show:false,fromPart:0,toPart:0});
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    fetch('https://bitbucket.org/!api/2.0/snippets/JoelPub/MK65rj/bf28e5047366ca68448e78c657c4e57bf6d5d8d1/files/svgtest.json')
      .then((response) => response.json())
      .then((json) => {setData(json.character);})
      .catch((error) => console.error(error))
      .finally(() => {setLoading(false);setRefreshing(false);});
  }, []);


  useEffect(() => {
    fetch('https://bitbucket.org/!api/2.0/snippets/JoelPub/MK65rj/bf28e5047366ca68448e78c657c4e57bf6d5d8d1/files/svgtest.json')
      .then((response) => response.json())
      .then((json) => {console.log(json);setData(json.character);})
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Modalpage modalData={modalData}  setModal={setModal}/>
        <View style={[{width:width, height:height}]}>
          <View style={{...styles.row, marginTop:-30, marginBottom:-70,zIndex:5}}>
            <TouchableOpacity
              onPress={() => setModal({show:true,fromPart:0,toPart:modalData.toPart})}
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            >
              <Text style={styles.textStyle}>Head</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModal({show:true,fromPart:1,toPart:modalData.toPart})}
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            >
              <Text style={styles.textStyle}>Body</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModal({show:true,fromPart:2,toPart:modalData.toPart})}
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            >
              <Text style={styles.textStyle}>Legs</Text>
            </TouchableOpacity>
          </View>
            {isLoading ? <ActivityIndicator/> : (
              <Menu bgcolor='white' ajaxData={data}  editable={true} modalData={modalData}  setModal={setModal}/>
            )}
        </View>
        <View style={[{width:width, height:height},styles.container]}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Gallery')}
              style={styles.item}
            >
              <Image
                resizeMode="contain"
                source={galleryIcon}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Calendar')}
              style={styles.item}
            >
              <Image
                resizeMode="contain"
                source={calendarIcon}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Video')}
              style={styles.item}
            >
              <Image
                resizeMode="contain"
                source={videoIcon}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>Video</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Components')}
              style={styles.item}
            >
              <Image
                resizeMode="contain"
                source={componentsIcon}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>Components</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Grids')}
              style={styles.item}
            >
              <Image
                resizeMode="contain"
                source={gridsIcon}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>Grides</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 120,
    paddingVertical: 20,
    borderColor: colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  itemText: {
    color: colors.primary,
    fontFamily: fonts.primary,
  },
  itemImage: {
    height: 35,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop:15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});
