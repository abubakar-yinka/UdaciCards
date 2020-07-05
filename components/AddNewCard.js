import React, { Component } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import TouchButton from './TouchButton';
import { darkGray, blue, green, red } from '../utils/colors';
import { connect } from 'react-redux';
import { addCardToDeck } from '../actions/index';
import { addCardToDeck_ } from '../utils/api';

class AddNewCard extends Component {
  state = {
    question: '',
    answer: ''
  };

  handleQuestionChange = question => {
    this.setState({ question });
  };

  handleAnswerChange = answer => {
    this.setState({ answer });
  };

  handleSubmit = () => {
    const { question, answer } = this.state;
    const { title, addCardToDeck, navigation } = this.props;
    const card = { question, answer };
    
    //Udate redux
    addCardToDeck(title, card);
    
    //Save to AsyncStorage
    addCardToDeck_(title, card);

    //Reset State and consequetially, the input field
    this.setState({ question: '', answer: '' });

    //Navigate back to DeckList
    navigation.navigate('DeckList')  
  };

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.field}>
          <Text style={styles.title}>Add a new card</Text>
        </View>

        <View style={styles.field}>
          <TextInput
            style={styles.input}
            value={question}
            onChangeText={this.handleQuestionChange}
            placeholder="Question"
          />
        </View>

        <View style={styles.field}>
          <TextInput
            style={styles.input}
            value={answer}
            onChangeText={this.handleAnswerChange}
            placeholder="Answer"
          />
        </View>

        {question === '' || answer === ''
          ? ( <Text style={styles.required}>Fill both Question and Answer please</Text> )
          : ( <TouchButton btnStyle={{ backgroundColor: green, borderColor: '#fff' }} onPress={this.handleSubmit} >Submit</TouchButton>
          )}

        <View style={{ height: '30%' }} />
      </KeyboardAvoidingView>
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
  },
  field: {
    marginBottom: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 35
  },
  input: {
    borderWidth: 1,
    borderColor: 'darkGray',
    backgroundColor: '#fff',
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10,
    fontSize: 15,
    height: 50
  },
  required: {
    marginTop: 30,
    txtStyle: red
  }
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');

  return {
    title
  };
};

export default connect( mapStateToProps, { addCardToDeck } )(AddNewCard);
