import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Deck from './Deck';
import TouchButton from './TouchButton';
import TextButton from './TextButton';
import { darkGray, gray, green, white, red } from '../utils/colors';
import { connect } from 'react-redux';
import { removeDeck } from '../actions/index';
import { removeDeck_ } from '../utils/api';

class DeckPreview extends Component {
  handleDelete = id => {
    const { removeDeck, navigation } = this.props;
    
    //Udate redux
    removeDeck(id);
    
    //Update AsyncStorage
    removeDeck_(id);

    navigation.goBack();
  };

  render() {
    const { deck, navigation } = this.props;

    return (
      <View style={styles.container}>
        <Deck id={deck.title} />
        <View>
          <TouchButton
            btnStyle={{ backgroundColor: white, borderColor: gray }}
            txtStyle={{ color: gray }}
            onPress={() => navigation.navigate('AddNewCard', { title: deck.title })}
          >
            Add a Card
          </TouchButton>
          <TouchButton
            btnStyle={{ backgroundColor: green, borderColor: white }}
            txtStyle={{ color: white }}
            onPress={() => navigation.navigate('Quiz', { title: deck.title })}
          >
            Start Your Quiz
          </TouchButton>
        </View>
        <TextButton
          txtStyle={{ color: red }}
          onPress={() => this.handleDelete(deck.title)}
        >
          Delete This Deck
        </TextButton>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkGray,
    justifyContent: 'space-around',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  }
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');

  return {
    deck: state[title]
  };
};

export default connect( mapStateToProps, { removeDeck } )(DeckPreview);
