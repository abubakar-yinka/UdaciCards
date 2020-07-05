//MainNavigatorTab contains tabNavigaor and stackNavigator
import React from 'react';
import { Platform } from 'react-native';
import * as Icon from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import DeckList from '.DeckList';
import AddDeck from '.AddDeck';
import DeckPreview from '.DeckPreview';
import AddNewCard from '.AddNewCard';
import Quiz from '.Quiz';
import Settings from '.Settings';
import { darkGray, white, green, blue } from '../utils/colors';

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => (
        <Icon.Ionicons
          name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'}
          size={25}
          color={tintColor}
        />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Icon.FontAwesome name="plus-square" size={25} color={tintColor} />
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => <Icon.FontAwesome name="sliders" size={25} color={tintColor} />
    }
  }
},{
  initialRouteName: 'Decks',
  backBehavior: 'Decks',
}, {
  defaultNavigationOptions: {
    bounces: true
  },
  tabBarOptions: {
    activeTintColor: blue,
    style: {
      height: 50,
      backgroundColor: white,
    },
    labelStyle: {
      fontWeight: 'bold',
      fontSize: 10,
    },
    tabStyle: {
      marginTop: 5,
      marginBottom: 3
    },
    // showIcon: true
  }
});

const MainTabNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: {
        title: 'Home',
        headerTintColor: 'white'
      }
    },
    DeckPreview: {
      screen: DeckPreview,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: blue
        },
        headerTitleStyle: {
          justifyContent: 'center',
          textAlign: 'center'
        },
        title: 'Deck Preview'
      }
    },
    AddNewCard: {
      screen: AddNewCard,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: blue
        },
        headerTitleStyle: {
          justifyContent: 'center',
          textAlign: 'center'
        },
        title: 'New Card'
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: blue
        },
        headerTitleStyle: {
          justifyContent: 'center',
          textAlign: 'center'
        },
      }
    }
  },
  // { headerTitleAlign: 'center' }
);

const AppNavigator = createAppContainer(MainTabNavigator);

export default AppNavigator
