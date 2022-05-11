import { TouchableOpacity, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Footer({ handleTrue, handleFalse }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, { borderColor: 'red' }]} onPress={handleFalse}>
        <Ionicons name="ios-close" size={40} color="red" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { borderColor: 'green' }]} onPress={handleTrue}>
        <Ionicons name="ios-checkmark" size={40} color="green" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 40,
    borderWidth: 2,
  },
});
