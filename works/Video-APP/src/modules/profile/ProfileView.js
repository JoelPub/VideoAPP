// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect, useState, createRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../components/Loader';
import { updateprofile } from './ProfileState';
import analytics from '@react-native-firebase/analytics';
const ProfileScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [userData, setUserData] = useState({login:false,userId:''});

  const passwordInputRef = createRef();
  const store = useSelector(state => state);
  const dispatch = useDispatch();
  const updateProfile = id => dispatch(updateprofile(id));

  useEffect(() => {
    console.log('initial profile',store.profile);
    AsyncStorage.getItem("user_id").then((value) => {
      if(value!=='') setUserData({login:true,userId:value});
    });
  }, []);

  const handleLogoutPress = () => {
    console.log('before action',store.profile);
    AsyncStorage.setItem('user_id', '').then((value) => {
      setUserData({login:false,userId:''});
      updateProfile('');

      console.log('after action',store.profile);
    });
  };

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    let dataToSend = {email: userEmail, password: userPassword};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log('before login',store.profile);
    fetch('https://bitbucket.org/!api/2.0/snippets/JoelPub/neGpAx/20eec1bbe8b3ad91aace7beff51ac3ed3eb5b360/files/adminlogin.json'
      // ,{
      //   method: 'POST',
      //   body: formBody,
      //   headers: {
      //     //Header Defination
      //     'Content-Type':
      //     'application/x-www-form-urlencoded;charset=UTF-8',
      //   },
      // }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(store.profile);
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === 'S') {
          console.log(responseJson.data.accountId);
          AsyncStorage.setItem('user_id', String(responseJson.data.accountId))
          .then((value) => {
            AsyncStorage.getItem("user_id")
            .then((value) => {
              if(value!=='') {
                setUserData({login:true,userId:value});
                updateProfile(value);
                console.log('after login',store.profile);
              }
            })
          })
          .then(res => {
            navigation.goBack();
          });
        } else {
          setErrortext(responseJson.msg);
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={async () =>
            await analytics().logSelectContent({
              content_type: 'clothing',
              item_id: 'abcd',
            })
          }>
          <Text style={styles.buttonTextStyle}>Select_Content Tracking</Text>
        </TouchableOpacity>
        {userData.login ? 
        <View>
        <Text
          style={styles.registerTextStyle}
          >
          用户{userData.userId}
        </Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleLogoutPress}>
            <Text style={styles.buttonTextStyle}>退出登录</Text>
          </TouchableOpacity>
        </View>:
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder="手机号码" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="密码" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>登录</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('Register')}>
              注册
            </Text>
          </KeyboardAvoidingView>
        </View>
        }
      </ScrollView>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});