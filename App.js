import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import middleware from './middleware'
import reducer from './reducers'
import AppNavigator from './components/AppNavigator';
import Constants from 'expo-constants';
import { setLocalNotification } from './utils/api';


const store = createStore(reducer, middleware)

function UdaciCardsStatusBar({ backgroundColor, ...rest }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar backgroundColor={backgroundColor} {...rest} translucent />
    </View>
  );
}

class App extends Component {
  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <UdaciCardsStatusBar  backgroundColor="blue"  barStyle="light-content" />
          <AppNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#666',

  },
});

export default App


