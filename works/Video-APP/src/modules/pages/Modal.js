import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  FlatList
} from "react-native";
import { colors, fonts } from '../../styles';

const DATA = [
  {
    id: 0,
    title: 'Boy',
    subtitle: 'Angry',
    image:
      'https://img.redocn.com/sheji/20200921/yuanchuangshouhuirenwukatongshengqifennudenanshijianbihua_11163623.jpg',
  },
  {
    id: 1,
    title: 'Man',
    subtitle: 'Office',
    image: 'https://img.redocn.com/sheji/20200922/yuanchuangshouhuirenwushangbanlushangchenmishoujidenanhaijianbihua_11165729.jpg',
  },
  {
    id: 2,
    title: 'Woman',
    subtitle: 'Office',
    image: 'https://img.redocn.com/sheji/20200921/yuanchuangshouhuirenwuchuanqunzizouluwanshoujidenvhaijianbihua_11163645.jpg',
  },
  {
    id: 3,
    title: 'Boy',
    subtitle: 'Limited',
    image:
      'https://img.redocn.com/sheji/20200921/yuanchuangshouhuirenwukatongshengqifennudenanshijianbihua_11163623.jpg',
  },
  {
    id: 4,
    title: 'Man',
    subtitle: 'Office',
    image: 'https://img.redocn.com/sheji/20200922/yuanchuangshouhuirenwushangbanlushangchenmishoujidenanhaijianbihua_11165729.jpg',
  },
  {
    id: 5,
    title: 'Woman',
    subtitle: 'Office',
    image: 'https://img.redocn.com/sheji/20200921/yuanchuangshouhuirenwuchuanqunzizouluwanshoujidenvhaijianbihua_11163645.jpg',
  },
];

const Item = ({ item,setModal,modalData }) => (
  <TouchableOpacity
    key={item.id}
    style={styles.itemTwoContainer}
    onPress={() => {
      setModal({show:false,fromPart:modalData.fromPart,toPart:(item.id % 3)});
    }}
  >
    <View style={styles.itemTwoContent}>
      <Image style={styles.itemTwoImage} source={{ uri: item.image }} />
      <View style={styles.itemTwoOverlay} />
      <Text style={styles.itemTwoTitle}>{item.title}</Text>
      <Text style={styles.itemTwoSubTitle}>{item.subtitle}</Text>
    </View>
  </TouchableOpacity>
);
class Modalpage extends Component {
  constructor(props){
      super(props);
  };

  componentDidUpdate(prevProps) {
      console.log(prevProps.modalData);
      console.log(this.props.modalData);
  }
  render() {
    const renderItem = ({ item,setModal,modalData }) => (
      <Item item={item} setModal={this.props.setModal} modalData={this.props.modalData}/>
    );
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalData.show}
          onRequestClose={() => {
            this.props.setModal({show:false,fromPart:null,toPart:null});
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal={true}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 5,
    backgroundColor: "transparent",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    height:150
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: 'white',
    margin: 5,
    width:100
  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
  },
  itemTwoTitle: {
    color: colors.lightGray,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: colors.lightGray,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: "cover"
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#6271da',
    opacity: 0.1,
  },
});

export default Modalpage;