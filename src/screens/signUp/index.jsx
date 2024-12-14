import React, {useState} from 'react';
import {View, SafeAreaView, Image, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {screenStyle} from '../../styles/screenStyles';
import {screenHeigth, screenWidth} from '../../utils/constants';
import {Button, Input} from '@ui-kitten/components';
import {Formik} from 'formik';
import {SingUpSchema} from '../../utils/schemas';
import {uiStyles} from '../../styles/uiStyles';
import Colors from '../../theme/colors';
import CustomModal from '../../components/ui/customModal';

const SignUp = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const createUser = (values, userId) => {
    setLoading(true);
    firestore()
      .collection('Users')
      .doc(userId)
      .set(values)
      .then(() => {
        setStatus(true);
        console.log('Note successfully added, status:', true);
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

  const signUpUser = values => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(data => {
        setStatus(true);
        createUser(values, data.user.uid);
      })
      .catch(error => {
        setStatus(false);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        setVisible(true);
      });
  };
  return (
    <SafeAreaView style={screenStyle.safeAreaView}>
      <View style={screenStyle.container}>
        <CustomModal
          descriptionSuccess={'Account has been added successfuly'}
          descriptionError={'An error accured'}
          visible={visible}
          closeModal={() => {
            setVisible(false);
            navigation.goBack();
          }}
          status={status}
        />
        <View style={{flex: 2}}>
          <Image
            source={require('../../assets/images/signIn.png')}
            style={{
              marginTop: 20,
              width: screenWidth,
              height: screenHeigth * 0.3,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{flex: 3}}>
          <Formik
            initialValues={{
              name: null,
              email: null,
              password: null,
            }}
            validationSchema={SingUpSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={values => signUpUser(values)}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <View style={{flex: 1}}>
                <Input
                  status={errors.name ? 'danger' : 'basic'}
                  caption={errors.name}
                  style={uiStyles.input}
                  value={values.name}
                  size="large"
                  label="Name"
                  placeholder="Enter your name here"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />

                <Input
                  status={errors.email ? 'danger' : 'basic'}
                  caption={errors.email}
                  style={uiStyles.input}
                  value={values.email}
                  size="large"
                  label="E-mail"
                  placeholder="Example@example.com"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />

                <Input
                  secureTextEntry={true}
                  status={errors.password ? 'danger' : 'basic'}
                  caption={errors.password}
                  style={uiStyles.input}
                  size="large"
                  value={values.password}
                  label="Password"
                  placeholder="Enter your password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />

                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                  <Button
                    disabled={loading}
                    style={{marginVertical: 5, borderRadius: 100}}
                    size="large"
                    onPress={handleSubmit}>
                    {loading ? (
                      <ActivityIndicator size="small" color={Colors.Color3} />
                    ) : (
                      'Register'
                    )}
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
