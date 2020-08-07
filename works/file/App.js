import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ToastAndroid } from 'react-native';
var RNFS = require('react-native-fs');
export default class App extends Component {
  componentDidMount() {
    console.log('componentDidMount lifecycle');
//list file
    RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    .then((result) => {
      console.log('GOT RESULT', result);

      // stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then((statResult) => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], 'utf8');
      }

      return 'no file';
    })
    .then((contents) => {
      // log the file contents
      console.log(contents);
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
//download file
  let dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath ; 
  //外部文件，共享目录的绝对路径（仅限android）
  //const downloadDest = `${dirs}/readme.txt`;
  //const downloadDest = `${dirs}/bg-sound.mp3`;
  const downloadDest = `${dirs}/four.mp4`;
  //下载地址
  //const formUrl = 'https://www.haidanmm.com/demos/icomoon/Read%20Me.txt';
  //const formUrl = 'https://www.haidanmm.com/demos/2012Carve/media/vignettes/bg-sound.mp3';
  const formUrl = 'https://vdept.bdstatic.com/6c63496b4e385a56614c464333363155/5979437638615643/194fd6273e97ffba8cf02c38d8a97718fc960b1af1002e2f3ccaeade8302a5f51621a0753ccaf5ea741f599d8454770c0208d092388cfc2eb3455f7416a23b09.mp4?auth_key=1596795861-0-0-80555eb322aa003a6e006fc7044f9e1d';
    
    const options = {
      fromUrl: formUrl,
      toFile: downloadDest,
      background: true,
      begin: (res) => {
        ToastAndroid.show('开始下载',ToastAndroid.SHORT)
        console.log('begin', res);
        console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
      },
      progress: (res) => { //下载进度
        let pro = res.bytesWritten / res.contentLength;
        console.log('pro==',pro)
      }
    }
    try {
      const ret = RNFS.downloadFile(options);
      ret.promise.then(res => {
        console.log('success', res);
        console.log('file://' + downloadDest)
        RNFS.readDir(dirs) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        .then((result) => {
          console.log('GOT RESULT', result);
    
          // stat the first file
          return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        })
        .then((statResult) => {
          if (statResult[0].isFile()) {
            // if we have a file, read it
            return RNFS.readFile(statResult[1], 'utf8');
          }
    
          return 'no file';
        })
        .then((contents) => {
          // log the file contents
          console.log(contents);
        })
        .catch((err) => {
          console.log(err.message, err.code);
        });
      }).catch(err => {
          console.log('err', err);
      });
    }catch (e) {
      ToastAndroid.show('下载失败',ToastAndroid.SHORT)
      console.log(error);
    }

// write the file
//    var path = RNFS.DocumentDirectoryPath + '/test.txt';
//
//    RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
//    .then((success) => {
//      console.log('FILE WRITTEN!');
//    })
//    .catch((err) => {
//      console.log(err.message);
//    });


//download video
//    const timestamp = (new Date()).getTime();//获取当前时间错
//    const random = String(((Math.random() * 1000000) | 0))//六位随机数
//    let dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath ; 
//    //外部文件，共享目录的绝对路径（仅限android）
//    const downloadDest = `${dirs}/${timestamp+random}.mp4`;
//	  //下载地址
//    const formUrl = 'https://assets.mixkit.co/videos/download/mixkit-colorful-design-on-tablet-921.mp4';
//    const options = {
//      fromUrl: formUrl,
//      toFile: downloadDest,
//      background: true,
//      begin: (res) => {
//        ToastAndroid.show('开始下载',ToastAndroid.SHORT)
//        console.log('begin', res);
//        console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
//      },
//      progress: (res) => { //下载进度
//        let pro = res.bytesWritten / res.contentLength;
//        console.log('pro==',pro)
//      }
//    }
//    try {
//      const ret = RNFS.downloadFile(options);
//      ret.promise.then(res => {
//        console.log('success', res);
//        console.log('file://' + downloadDest)
//		//如果下载的是  视频或图片 可以保存到相册，方便查看
//        const promise = CameraRoll.saveToCameraRoll(downloadDest)
//        promise.then(result => {
//          //alert('保存成功！地址如下：\n' + result);
//          //下载成功，请在相册中查看
//          console.log('down res',result);
//        }).catch(function(error) {
//          console.error('error2', error);
//          // alert('保存失败！\n' + error);
//        });
//      }).catch(err => {
//          console.log('err', err);
//      });
//    }catch (e) {
//      ToastAndroid.show('下载失败',ToastAndroid.SHORT)
//      console.log(error);
//    }



  }
    render() {
        console.log('Render lifecycle')
        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>Hello World!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});