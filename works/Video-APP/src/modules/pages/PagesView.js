import React, { useEffect, useState }  from 'react';
import { RefreshControl,ActivityIndicator, Dimensions,SafeAreaView,ScrollView,StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import { colors, fonts } from '../../styles';

import Menu from "./Menu";
const calendarIcon = require('../../../assets/images/pages/calendar.png');
const galleryIcon = require('../../../assets/images/pages/gallery.png');
const videoIcon = require('../../../assets/images/pages/chart.png');
const componentsIcon = require('../../../assets/images/pages/chat.png');
const { height, width } = Dimensions.get("window");
export default PagesScreen = (props) =>{
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    fetch('https://bitbucket.org/!api/2.0/snippets/JoelPub/n7a4pe/21d39516ecb4a771684d1e309742240285043c48/files/svgwukong.json')
      .then((response) => response.json())
      .then((json) => {console.log(json);setData(json.character);})
      .catch((error) => console.error(error))
      .finally(() => {setLoading(false);setRefreshing(false);});
  }, []);


  useEffect(() => {
    fetch('https://bitbucket.org/!api/2.0/snippets/JoelPub/n7a4pe/21d39516ecb4a771684d1e309742240285043c48/files/svgwukong.json')
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
        <View style={[{width:width, height:height}]}>
            {isLoading ? <ActivityIndicator/> : (
              <Menu bgcolor='white' ajaxData={data}/>
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
});
