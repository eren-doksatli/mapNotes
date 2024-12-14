import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import Colors from '../../theme/colors';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import CustomCallout from '../../components/ui/customCallout';
import FloatActionButton from '../../components/ui/floatAction';
import {ArrowRight, Map, Refresh2} from 'iconsax-react-native';
import {ADDNOTE} from '../../utils/routes';
import {screenWidth} from '../../utils/constants';

const Maps = ({navigation}) => {
  const [notes, setNotes] = useState([]);

  const [position, setPosition] = useState(null);

  const [coordinate, setCoordinate] = useState(null);

  const [mapType, setMapType] = useState('standart');

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
            coordinate: documentSnapshot.data().coordinate,
          });
        });
        setNotes(notes);
      });
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition(pos);
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  };

  const handleMarkerPress = e => {
    const {coordinate} = e?.nativeEvent;
    setCoordinate(coordinate);
  };

  const changeMapType = () => {
    if (mapType == 'standart') setMapType('satellite');
    else setMapType('standart');
  };

  useEffect(() => {
    getCurrentPosition();
    getNotes();
  }, []);
  return (
    <View style={styles.container}>
      {position && (
        <MapView
          mapType={mapType}
          zoomControlEnabled
          zoomEnabled
          showsUserLocation
          onPress={handleMarkerPress}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 1,
          }}>
          {notes.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                longitude: marker.coordinate.longitude,
                latitude: marker.coordinate.latitude,
              }}
              title={marker.title}
              description={marker.description}>
              <Callout>
                <CustomCallout marker={marker} />
              </Callout>
            </Marker>
          ))}
          {coordinate && (
            <Marker
              coordinate={{
                longitude: coordinate.longitude,
                latitude: coordinate.latitude,
              }}
            />
          )}
        </MapView>
      )}
      {coordinate && (
        <FloatActionButton
          backgroundColor={
            mapType == 'standart' ? Colors.Color4 : Colors.Color1
          }
          onPress={() => navigation.navigate(ADDNOTE, {coordinate: coordinate})}
          icon={
            <ArrowRight
              size={30}
              color={mapType == 'standart' ? Colors.White : Colors.Black}
            />
          }
        />
      )}
      <FloatActionButton
        customStyle={{
          top: 20,
          width: screenWidth * 0.15,
          height: screenWidth * 0.15,
        }}
        onPress={() => changeMapType()}
        backgroundColor={mapType == 'standart' ? Colors.Color4 : Colors.Color1}
        icon={
          <Map
            size={30}
            color={mapType == 'standart' ? Colors.White : Colors.Black}
          />
        }
      />
      <FloatActionButton
        customStyle={{
          top: 20,
          left: 20,
          width: screenWidth * 0.15,
          height: screenWidth * 0.15,
        }}
        onPress={() => getNotes()}
        backgroundColor={mapType == 'standart' ? Colors.Color4 : Colors.Color1}
        icon={
          <Refresh2
            size={30}
            color={mapType == 'standart' ? Colors.White : Colors.Black}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Maps;
