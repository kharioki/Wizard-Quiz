import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, SafeAreaView, Pressable } from 'react-native';

import { Text, View } from '../components/Themed';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to the</Text>
        <Text style={styles.title}>Trivia Challenge!</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyText}>
          You will be presented with 10 True or False questions.
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyText}>
          Can you score 100%?
        </Text>
      </View>
      <View style={styles.footer}>
        <Pressable onPress={() => navigation.navigate('Quiz')}>
          <Text style={styles.footerText}>Begin</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  titleContainer: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  bodyText: {
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 1,
  },
  footer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
