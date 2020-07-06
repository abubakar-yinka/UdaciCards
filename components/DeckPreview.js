import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Deck from './Deck';
import TouchButton from './TouchButton';
import { green, white, darkGray, gray } from '../utils/colors';
import { connect } from 'react-redux';

class DeckPreview extends Component {
  render() {
    const { deck, navigation } = this.props;

    return (
      <View style={styles.container}>
        <Deck id={deck.title} />
        <View>
          <TouchButton
            btnStyle={{  borderColor: gray, backgroundColor: white }}
            txtStyle={{ color: gray }}
            onPress={() => navigation.navigate('AddNewCard', { title: deck.title })}
          >
            Add a Card
          </TouchButton>
          <TouchButton
            btnStyle={{  borderColor: white, backgroundColor: green}}
            txtStyle={{ color: white }}
            onPress={() => navigation.navigate('Quiz', { title: deck.title })}
          >
            Start Your Quiz
          </TouchButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    backgroundColor: darkGray,
    justifyContent: 'space-around',
  }
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');
  const deck = state[title];

  return {
    deck
  };
};

export default connect( mapStateToProps )(DeckPreview);
