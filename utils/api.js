import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';

const DECKS_STORAGE_KEY = 'UdaciCards:decks';
const NOTIFICATION_KEY = 'UdaciCards:notifications';

export const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

export function getData() {
  return decks;
}

//Asynchronous functions
export async function getDecks() {
  try {
    const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    if (storeResults === null) {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    }
    return storeResults === null 
      ? decks 
      : JSON.parse(storeResults);
  } catch (error) {
    console.log('There is an error: ', error);
  }
}

export async function getDeck(id) {
  try {
    const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    return JSON.parse(storeResults)[id];
  } catch (error) {
    console.log('There is an error: ', error);
  }
}

export async function addCardToDeck_(title, card) {
  try {
    const deck = await getDeck(title);

    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(card)
        }
      })
    );
  } catch (error) {
    console.log('There is an error: ', error);
  }
}

export async function saveDeckTitle_(title) {
  return AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: []
        }
      })
    );
}

export async function resetDecks() {
  try {
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  } catch (error) {
    console.log('There is an error: ', error);
  }
}

function createNotification () {
  return {
    title: 'UdaciCards',
    body: "Hey there👋 don't forget to review your flashcards today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

