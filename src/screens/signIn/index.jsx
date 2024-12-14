import React, {Component, useState} from 'react';
import {View, SafeAreaView, Image, ActivityIndicator} from 'react-native';
import {screenStyle} from '../../styles/screenStyles';
import {screenHeigth, screenWidth} from '../../utils/constants';
import {Button, Input} from '@ui-kitten/components';
import {Formik} from 'formik';
import {SingInSchema} from '../../utils/schemas';
import {uiStyles} from '../../styles/uiStyles';
import auth from '@react-native-firebase/auth';
import CustomModal from '../../components/ui/customModal';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const SignIn = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const signInUser = values => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        setStatus(true);
        console.log('User signed in successfully!');
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
          descriptionSuccess={'Login Successful'}
          descriptionError={'Login Error. Please try again'}
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
        <View style={{flex: 2}}>
          <Formik
            initialValues={{
              email: null,
              password: null,
            }}
            validationSchema={SingInSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={values => signInUser(values)}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <View style={{flex: 1}}>
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
                      'Login'
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

//make this component available to the app
export default SignIn;
