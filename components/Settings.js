import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { darkGray, white, red, gray, blue } from '../utils/colors';
import TouchButton from './TouchButton';
import { resetDecks } from '../utils/api.js';
import { connect } from 'react-redux';
import { clearCreatedDecks } from '../actions/index';

class Settings extends Component {

  handleResetDecks = () => {
    //Update Redux
    this.props.dispatch(clearCreatedDecks());

    //Update AsyncStorage
    resetDecks();

    //Navigate Back
    this.props.navigation.goBack();

  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Settings </Text>
        <View style={styles.block}>
          <View style={styles.blockContainer}>
            <Text style={styles.blockText}>
              This will reset the deck's data back to the default state.
            </Text>
            <View style={{ height: 20 }} />
            <TouchButton
              btnStyle={{ backgroundColor: red, borderColor: white }}
              onPress={this.handleResetDecks}
            >
              Reset Data
            </TouchButton>
          </View>
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
    backgroundColor: darkGray
  },
  title: {
    fontSize: 45,
    textAlign: 'center',
    marginBottom: 15,
    color: blue
  },
  block: {
    marginBottom: 20
  },
  blockContainer: {
    borderWidth: 1,
    borderColor: gray,
    backgroundColor: white,
    borderRadius: 5,
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15
  },
  blockText: {
    fontSize: 20,
    color: gray
  }
});

export default connect()(Settings);
