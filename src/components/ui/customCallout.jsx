import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../theme/colors';
import {screenHeigth, screenWidth} from '../../utils/constants';

const CustomCallout = ({marker}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.title}>{marker?.title}</Text>
        <Text style={styles.description}>{marker?.description}</Text>
      </View>
      <Text style={styles.date}>
        {marker?.date} - {marker?.time}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    width: screenWidth * 0.5,
    height: screenHeigth * 0.1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginVertical: 10,
  },
  date: {
    fontSize: 14,
    color: Colors.Color3,
  },
});

export default CustomCallout;
