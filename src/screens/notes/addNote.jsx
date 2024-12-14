import React, {useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {screenStyle} from '../../styles/screenStyles';
import {Input, Button} from '@ui-kitten/components';
import {uiStyles} from '../../styles/uiStyles';
import {Formik} from 'formik';
import firestore from '@react-native-firebase/firestore';
import {addNoteSchema} from '../../utils/schemas';
import CustomModal from '../../components/ui/customModal';
import Colors from '../../theme/colors';

const AddNote = ({route, navigation}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const coordinate = route.params.coordinate;

  const refreshNotes = route.params?.refreshNotes;

  const addNote = values => {
    setLoading(true);
    firestore()
      .collection('Notes')
      .add(values)
      .then(() => {
        setStatus(true);
        console.log('Note successfully added, status:', true);
        if (refreshNotes) refreshNotes();
      })
      .catch(error => {
        console.log('Error adding note:', error);
        setStatus(false);
        console.log('Note adding failed, status:', false);
      })
      .finally(() => {
        setVisible(true);
        setLoading(false);
      });
  };

  return (
    <View style={screenStyle.container}>
      <CustomModal
        visible={visible}
        closeModal={() => setVisible(false)}
        status={status}
      />
      <Formik
        initialValues={{
          title: '',
          description: '',
          date: '',
          time: '',
          coordinate: coordinate,
        }}
        validationSchema={addNoteSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={values => addNote(values)}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View>
            <Input
              status={errors.title ? 'danger' : 'basic'}
              caption={errors.title}
              style={uiStyles.input}
              value={values.title}
              size="large"
              label="Title"
              placeholder="Note title"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
            />
            <Input
              status={errors.description ? 'danger' : 'basic'}
              caption={errors.description}
              multiline
              size="large"
              value={values.description}
              label="Description"
              placeholder="Add details"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
            />
            <Input
              status={errors.date ? 'danger' : 'basic'}
              caption={errors.date}
              size="large"
              value={values.date}
              label="Date"
              placeholder="Select a date"
              onChangeText={handleChange('date')}
              onBlur={handleBlur('date')}
            />
            <Input
              status={errors.time ? 'danger' : 'basic'}
              caption={errors.time}
              size="large"
              value={values.time}
              label="Time"
              placeholder="Select a time"
              onChangeText={handleChange('time')}
              onBlur={handleBlur('time')}
            />
            <Button
              disabled={loading}
              style={uiStyles.button}
              onPress={handleSubmit}>
              {loading ? (
                <ActivityIndicator size="small" color={Colors.Color3} />
              ) : (
                'ADD NOTE'
              )}
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddNote;
