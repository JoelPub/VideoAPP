import React from 'react';
import { Dimensions,SafeAreaView,ScrollView,StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import { colors, fonts } from '../../styles';

import Dashboard from "./Dashboard";
import Menu from "./Menu";
const calendarIcon = require('../../../assets/images/pages/calendar.png');
const galleryIcon = require('../../../assets/images/pages/gallery.png');
const videoIcon = require('../../../assets/images/pages/chart.png');
const componentsIcon = require('../../../assets/images/pages/chat.png');
const { height, width } = Dimensions.get("window");

export default function PagesScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
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
        <View style={[{width:width, height:height}]}>
          <Menu />
          <Dashboard />
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
