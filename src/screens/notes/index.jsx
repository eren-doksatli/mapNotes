import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {screenStyle} from '../../styles/screenStyles';
import firestore from '@react-native-firebase/firestore';
import FloatActionButton from '../../components/ui/floatAction';
import NoteItem from '../../components/notes/noteItem';
import {ADDNOTE} from '../../utils/routes';
import {Add} from 'iconsax-react-native';
import Colors from '../../theme/colors';

const Notes = ({navigation}) => {
  const [notes, setNotes] = useState([]);

  const getNotes = () => {
    firestore()
      .collection('Notes')
      .get()
      .then(querySnapShot => {
        let notes = [];
        querySnapShot.forEach(documentSnapshot => {
          notes.push({
            id: documentSnapshot.id,
            title: documentSnapshot.data().title,
            description: documentSnapshot.data().description,
            time: documentSnapshot.data().time,
            date: documentSnapshot.data().date,
          });
        });
        setNotes(notes);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNotes();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={screenStyle.container}>
      <FlatList
        data={notes}
        renderItem={({item}) => <NoteItem item={item} getNotes={getNotes} />}
      />
      <FloatActionButton
        icon={<Add size={40} color={Colors.White} />}
        onPress={() => navigation.navigate(ADDNOTE, {refreshNotes: getNotes})}
      />
    </View>
  );
};

export default Notes;
