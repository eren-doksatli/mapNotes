import React, {Component} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import Colors from '../../theme/colors';
import {screenHeigth, screenWidth} from '../../utils/constants';
import {CloseCircle, TickCircle} from 'iconsax-react-native';
import {Button} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

const CustomModal = ({
  visible,
  closeModal,
  status,
  descriptionSuccess,
  descriptionError,
}) => {
  const navigation = useNavigation();
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.container}>
        <View style={styles.body}>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            {status ? (
              <TickCircle size="80" color="#37D67A" variant="Bold" />
            ) : (
              <CloseCircle size="80" color={Colors.Color5} variant="Bold" />
            )}
          </View>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{fontSize: 18, fontWeight: '600', marginVertical: 10}}>
              {status ? 'Succesful!' : 'Error'}
            </Text>
            <Text
              style={{textAlign: 'center', fontSize: 16, color: Colors.Color3}}>
              {status
                ? descriptionSuccess
                  ? descriptionSuccess
                  : 'Note Has Been Added.'
                : descriptionError
                ? descriptionError
                : 'Failed to Add Note.'}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 1,
            }}>
            <Button
              onPress={() => navigation.goBack()}
              style={{backgroundColor: Colors.Color4}}>
              Okay
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  body: {
    backgroundColor: Colors.White,
    width: screenWidth * 0.8,
    height: screenHeigth * 0.4,
    borderRadius: 8,
    padding: 10,
  },
});

export default CustomModal;
