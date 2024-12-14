import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {screenStyle} from '../../styles/screenStyles';
import {Input, Button} from '@ui-kitten/components';
import {uiStyles} from '../../styles/uiStyles';
import {Formik} from 'formik';
import firestore from '@react-native-firebase/firestore';
import {addNoteSchema} from '../../utils/schemas';
import CustomModal from '../../components/ui/customModal';
import Colors from '../../theme/colors';

const UpdatetNote = ({route}) => {
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState(false);

  const note = route.params.note;

  const updateNote = values => {
    setLoading(true);
    firestore()
      .collection('Notes')
      .doc(note?.id)
      .update(values)
      .then(() => {
        setStatus(true);
      })
      .catch(error => {
        console.log(error);
        setStatus(false);
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
          title: note?.title,
          description: note?.description,
          date: note?.date,
          time: note?.time,
        }}
        validationSchema={addNoteSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={values => updateNote(values)}>
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
                <ActivityIndicator size="small" color={Colors.Color5} />
              ) : (
                'UPDATE'
              )}
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default UpdatetNote;
