import { Animated, StyleSheet } from 'react-native';
import { Text } from './Themed';

export default function Choice({ type, style }) {
  return (
    <Animated.View style={[styles.choice, style, { borderColor: type === "true" ? 'green' : 'red' }]}>
      <Text style={[styles.choiceText, { color: type === "true" ? 'green' : 'red' }]}>{type}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  choice: {
    position: 'absolute',
    borderWidth: 4,
    borderRadius: 5,
    padding: 10,
  },
  choiceText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  }
});
