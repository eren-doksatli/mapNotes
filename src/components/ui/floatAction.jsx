import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../theme/colors';
import {screenHeigth, screenWidth} from '../../utils/constants';
import {Add} from 'iconsax-react-native';

const FloatActionButton = props => {
  const {icon, backgroundColor = Colors.Color4, customStyle = {}} = props;
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.container,
        {backgroundColor: backgroundColor},
        customStyle,
      ]}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    zIndex: 999,
    alignItems: 'center',
    backgroundColor: Colors.Color4,
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    position: 'absolute',
    bottom: screenHeigth * 0.05,
    right: 20,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
});

export default FloatActionButton;
