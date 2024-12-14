import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {View, Text, StyleSheet} from 'react-native';
import {screenStyle} from '../../styles/screenStyles';
import {UserSquare} from 'iconsax-react-native';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      if (value !== null) {
        firestore()
          .collection('Users')
          .doc(value)
          .get()
          .then(documentSnapshot => {
            console.log('User exists: ', documentSnapshot.exists);

            if (documentSnapshot.exists) {
              console.log('User data: ', documentSnapshot.data());
              setUserInfo(documentSnapshot.data());
            }
          });
        console.log(value);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={screenStyle.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <UserSquare size={100} variant="Bold" />
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{userInfo?.name}</Text>
      </View>
    </View>
  );
};

export default Profile;
