import { StyleSheet, Animated } from 'react-native';
import { ACTION_OFFSET, CARD, height, width } from '../constants/CardConstants';
import { formatText } from '../utils/helpers';
import { Text, View, AnimatedView } from './Themed';
import Choice from './Choice';
import Footer from './Footer';

type cardProps = {
  item: any,
  number: number,
  totalItems: number,
  isFirst: boolean,
  pan: Animated.ValueXY,
  tiltSign: Animated.Value,
  onChoice: (arg0: number) => void,
}

export default function Card(props: cardProps) {
  const { item, number, totalItems, isFirst, pan, onChoice, ...rest } = props;
  
  // rotate gesture
  const rotate = pan.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const trueOpacity = pan.x.interpolate({
    inputRange: [10, ACTION_OFFSET],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const falseOpacity = pan.x.interpolate({
    inputRange: [-ACTION_OFFSET, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animatedCardStyle = {
    transform: [...pan.getTranslateTransform(), { rotate }],
  };

  return (
    <AnimatedView
      style={[styles.card, isFirst && animatedCardStyle]}
      {...rest}
    >
      <Text style={styles.title}>{item.category}</Text>
      <View style={styles.cardContent}>
        <View style={styles.cardText}>
          <Text style={styles.bold}>{formatText(item.question)}</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.footerText}>{number} of {totalItems}</Text>
        </View>
      </View>
      <Footer handleFalse={() => onChoice(-1)} handleTrue={() => onChoice(1)} />
      {isFirst && (
        <>
          <Choice
            type="true"
            style={{ opacity: trueOpacity, top: height * 0.12, left: width * 0.1 }}
          />
          <Choice
            type="false"
            style={{ opacity: falseOpacity, top: height * 0.12, right: width * 0.2 }}
          />
        </>
      )}
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD.CARD_WIDTH,
    height: CARD.CARD_HEIGHT,
    padding: 10,
    position: 'absolute',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardText: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#222',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 30,
  },
  cardFooter: {
    alignItems: 'center',
    padding: 10,
  },
  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
