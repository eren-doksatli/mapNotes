import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Colors from '../../theme/colors';
import {Edit2, Trash} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {UPDATENOTE} from '../../utils/routes';
import firestore from '@react-native-firebase/firestore';

const NoteItem = ({item, getNotes}) => {
  const navigation = useNavigation();

  const deleteNote = () => {
    firestore()
      .collection('Notes')
      .doc(item.id)
      .delete()
      .then(() => {
        alert('Note has been removed');
        getNotes();
      });
  };

  const askUser = () => {
    Alert.alert('Delete Note', 'Are you sure to delete this note?', [
      {
        text: 'Delete',
        onPress: () => deleteNote(),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>
          {item.date}-{item.time}
        </Text>

        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          onPress={() => navigation.navigate(UPDATENOTE, {note: item})}>
          <Edit2 size={28} color={Colors.Color6} variant="Bold" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => askUser()}>
          <Trash size={25} color={Colors.Color5} variant="Bold" />
        </TouchableOpacity>
        <Text style={styles.time}></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Color2,
    padding: 10,
    paddingVertical: 20,
    margin: 5,
    borderRadius: 5,
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    marginVertical: 20,
  },
  time: {
    fontSize: 14,
    color: Colors.Color3,
    textAlign: 'right',
  },
  date: {
    fontSize: 14,
    color: Colors.Color3,
    textAlign: 'left',
    marginTop: 5,
  },
  infoContainer: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default NoteItem;
