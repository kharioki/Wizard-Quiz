import { StatusBar } from 'expo-status-bar';
import { useCallback, useState, useRef, useEffect } from "react";
import { Platform, StyleSheet, Animated, PanResponder } from 'react-native';

import { View } from '../components/Themed';
import Card from '../components/Card';
import { CARD, ACTION_OFFSET } from '../constants/CardConstants';

export default function QuizScreen({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const fetchQuestions = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean");
    const data = await response.json();
    setQuestions(data.results);
    setTotalQuestions(data.results.length);
    return data.results;
  }

  // fetch questions from api
  useEffect(() => {
    fetchQuestions()
  }, [])

  const pan = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  const transitionNext = useCallback(() => {
    setCurrentQuestion((prev) => prev === totalQuestions ? 1 : prev + 1);
    setQuestions((prev) => prev.slice(1));
    pan.setValue({ x: 0, y: 0 });
    
  }, [pan]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, { dx, dy, y0 }) => {
        tiltSign.setValue(y0 > CARD.CARD_HEIGHT / 2 ? 1 : -1);
        pan.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: (e, { dx, dy }) => {
        const direction = Math.sign(dx);
        const userAction = Math.abs(dx) > ACTION_OFFSET;

        if (userAction) {
          Animated.timing(pan, {
            duration: 200,
            toValue: { x: direction * CARD.CARD_OUT_WIDTH, y: dy },
            useNativeDriver: true,
          }).start(transitionNext);

          if (direction === 1) {
            handleSelectTrue();
          } else {
            handleSelectFalse();
          }

        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const handleChoice = useCallback(
    (choice) => {
      console.log(choice);
      if (currentQuestion === totalQuestions) {
        navigation.navigate("Results");
      } else if (choice === 1) {
        handleSelectTrue();
      } else {
        handleSelectFalse();
      }

      Animated.timing(pan.x, {
        duration: 500,
        toValue: choice * CARD.CARD_OUT_WIDTH,
        useNativeDriver: true,
      }).start(transitionNext);
    },
    [pan.x, transitionNext],
  );

  const handleSelectTrue = () => {
    console.log("true");
  }

  const handleSelectFalse = () => {
    console.log("false");
  }

  console.log(currentQuestion);

  return (
    <View style={styles.container}>
      {questions.map((item, index) => {
        const isFirst = index === 0;
        const panHandlers = isFirst ? panResponder.panHandlers : {};

        return (
          <Card
            key={index}
            item={item}
            number={currentQuestion}
            totalItems={10}
            isFirst={isFirst}
            pan={pan}
            tiltSign={tiltSign}
            onChoice={handleChoice}
            {...panHandlers}
          />
        );
      }).reverse()
      }
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
