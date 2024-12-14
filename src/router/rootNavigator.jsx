import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notes from '../screens/notes';
import {
  ADDNOTE,
  LAUNCH,
  MAP,
  NOTES,
  PROFILE,
  SIGNIN,
  SIGNUP,
  UPDATENOTE,
} from '../utils/routes';
import Profile from '../screens/profile';
import AddNote from '../screens/notes/addNote';
import UpdateNote from '../screens/notes/updateNote';
import Maps from '../screens/maps';
import {Text, View} from 'react-native';
import {Add, Logout, Note1, User} from 'iconsax-react-native';
import Colors from '../theme/colors';
import SignIn from '../screens/signIn';
import SignUp from '../screens/signUp';
import Launch from '../screens/launch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const userSignOut = () => {
    auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem('uid');
      });
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('uid', value);
    } catch (e) {}
  };

  function onAuthStateChanged(user) {
    if (user) {
      storeData(user?.uid);
    }
    setUser(user);

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator
      screenOptions={{headerBackTitle: 'Back', headerTintColor: Colors.Black}}>
      {user ? (
        <Stack.Group>
          <Stack.Screen
            name={MAP}
            component={Maps}
            options={({navigation}) => ({
              headerRight: () => (
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Note1
                    size="25"
                    color={Colors.Black}
                    onPress={() => navigation.navigate(NOTES)}
                  />
                  <User
                    style={{marginHorizontal: 5}}
                    size="25"
                    color={Colors.Black}
                    onPress={() => navigation.navigate(PROFILE)}
                  />
                </View>
              ),
            })}
          />

          <Stack.Screen name={NOTES} component={Notes} />
          <Stack.Screen
            name={PROFILE}
            component={Profile}
            options={({navigation}) => ({
              headerRight: () => (
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Logout
                    size="25"
                    color={Colors.Color5}
                    onPress={() => userSignOut()}
                  />
                </View>
              ),
            })}
          />
          <Stack.Screen name={ADDNOTE} component={AddNote} />
          <Stack.Screen name={UPDATENOTE} component={UpdateNote} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            options={{headerShown: false}}
            name={LAUNCH}
            component={Launch}
          />
          <Stack.Screen name={SIGNIN} component={SignIn} />
          <Stack.Screen name={SIGNUP} component={SignUp} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

export default RootNavigator;
