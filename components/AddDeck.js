import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { darkGray, green, white } from '../utils/colors';
import { connect } from 'react-redux';
import { addDeck } from '../actions/index';
import { saveDeckTitle_ } from '../utils/api';
import { StackActions, NavigationActions } from 'react-navigation';
import TouchButton from './TouchButton';

class AddDeck extends Component {
  state = {
    input: ''
  };

  handleChange = input => {
    this.setState({ input });
  };

  handleSubmit = () => {
    const { addDeck, navigation } = this.props;
    const { input } = this.state;

    //Udate redux
    addDeck(input);

    //update AsyncStorage
    saveDeckTitle_(input);

    //Navigate to home, Reset State and consequetially, the input field
    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'DeckPreview', params: { title: input }})
      ]
    });
    navigation.dispatch(resetAction);
    this.setState(() => ({ input: '' }));
  };

  render() {
    const { input } = this.state;

    return (
      <KeyboardAvoidingView  style={styles.container}>
        <View style={{ height: 100 }} />
        <View style={styles.field}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
        </View>
        <View style={[styles.field]}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={this.handleChange}
            placeholder="Type Deck Name Here"
          />
        </View>
        <TouchButton
          btnStyle={{ backgroundColor: green, borderColor: white }}
          onPress={this.handleSubmit}
          disabled={input === ''}
        >
          Create Deck
        </TouchButton>
      </KeyboardAvoidingView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: darkGray
  },
  field: {
    marginBottom: 25
  },
  title: {
    textAlign: 'center',
    fontSize: 32
  },
  input: {
    flex: 0.7,
    borderWidth: 1,
    borderColor: darkGray,
    backgroundColor: white,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 10,
    fontSize: 15,
    height: 50,
    marginBottom: 20
  }
});

export default connect( null, { addDeck } )(AddDeck);
