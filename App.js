import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import middleware from './middleware'
import reducer from './reducers'
import AppNavigator from './components/AppNavigator';

const store = createStore(reducer, middleware)

function UdaciCardsStatusBar({ backgroundColor, ...rest }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...rest} />
    </View>
  );
}
export default class App extends Component {
  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <UdaciCardsStatusBar  backgroundColor="purple"  barStyle="light-content" />
          <AppNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
