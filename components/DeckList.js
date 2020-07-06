import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Deck from './Deck';
import { darkGray, blue  } from '../utils/colors';
import { handleInitialData } from '../actions/index';

class DeckList extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { decks, navigation } = this.props;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>UdaciCards</Text>
        {console.log(decks)} 
        {Object.values(decks).map(deck => {
          return (
            <TouchableOpacity
              key={deck.title}
              onPress={() => navigation.navigate('DeckPreview', { title: deck.title })}
            >
              <Deck id={deck.title} />
            </TouchableOpacity>
          );
        })}
        <View style={{ marginBottom: 30 }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkGray,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  title: {
    color: blue,
    fontSize: 45,
    textAlign: 'center',
    marginBottom: 15,
  }
})

const mapStateToProps = state => ({ decks: state });

export default connect( mapStateToProps )(DeckList);
