import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const DECKS_STORAGE_KEY = 'UdaciCards:decks';
const NOTIFICATION_KEY = 'UdaciCards:notifications';

export function getDefaultDecks() {
  const decks = {
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

  return decks;
}

function formatTheDecks (results) {
  return results === null ? getDefaultDecks() : JSON.parse(results)
}

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks) => formatTheDecks(decks))
}

export function getDeck(key) {
    const storeDeck = AsyncStorage.getItem(DECKS_STORAGE_KEY);

    return JSON.parse(storeDeck)[key];
}

export function addCardToDeck_ (card, title) {
  const deck = getDeck(title);

  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        questions: [...deck.questions].concat(card)
      }
    })
  );
}

export function resetDecks() {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
}

export function removeDeck_(key) {
  const results = AsyncStorage.getItem(DECKS_STORAGE_KEY);
  const data = JSON.parse(results);
  data[key] = undefined;
  delete data[key];
  
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
}

export function saveDeckTitle_ (title) {
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

