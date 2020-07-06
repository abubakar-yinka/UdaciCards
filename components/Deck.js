import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { white, gray } from '../utils/colors';
import { connect } from 'react-redux';

const Deck = props => {
  const { deck } = props;
    if (deck === undefined) {
    return <View style={styles.deckContainer} />;
  } else {
    return (
      <View style={styles.deckContainer}>
        <View>
          <Text style={styles.deckText}>{deck.title}</Text>
        </View>
        <View>
          <Text style={styles.cardText}>{deck.questions.length} cards</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  deckContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: 100,
    minHeight: 120,
    backgroundColor: white,
    borderColor: gray,
    borderRadius: 5,
    marginBottom: 10
  },
  deckText: {
    fontSize: 30
  },
  cardText: {
    fontSize: 20,
    color: gray
  }
});

const mapStateToProps = (state, { id }) => {
  return {
    deck: state[id]
  };
}

export default connect(mapStateToProps)(Deck);
