import {StyleSheet} from 'react-native';
import Colors from '../theme/colors';

const screenStyle = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.White,
  },
});

export {screenStyle};
