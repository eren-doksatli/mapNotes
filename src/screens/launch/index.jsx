import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import {screenStyle} from '../../styles/screenStyles';
import {screenHeigth, screenWidth} from '../../utils/constants';
import Colors from '../../theme/colors';
import {Button} from '@ui-kitten/components';
import {SIGNIN, SIGNUP} from '../../utils/routes';

const Launch = ({navigation}) => {
  return (
    <SafeAreaView style={screenStyle.safeAreaView}>
      <View style={screenStyle.container}>
        <View style={{flex: 2}}>
          <Image
            source={require('../../assets/images/launch.png')}
            style={{
              width: screenWidth,
              height: screenHeigth * 0.3,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              textAlign: 'center',
              marginVertical: 10,
            }}>
            Hi there!
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              marginVertical: 10,
              color: Colors.Color3,
            }}>
            Welcome to Mapnotes App, where you can manage your tasks in a world
            map!
          </Text>
        </View>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <Button
            style={{marginVertical: 5, borderRadius: 100}}
            size="large"
            onPress={() => navigation.navigate(SIGNIN)}>
            Login
          </Button>
          <Button
            appearance="outline"
            style={{marginVertical: 5, borderRadius: 100}}
            size="large"
            onPress={() => navigation.navigate(SIGNUP)}>
            Register
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Launch;
