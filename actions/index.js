import { getDecks } from '../utils/api';

//action types
export const ADD_DECK = 'ADD_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_CARD = 'ADD_CARD';
export const CLEAR_DECKS = 'CLEAR_DECKS';

//action creators
export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  };
}

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id
  };
}

export function addCardToDeck(title, card) {
  return {
    type: ADD_CARD,
    title,
    card,
  };
}

export function clearCreatedDecks() {
  return {
    type: CLEAR_DECKS,
  };
}

//asynchronous action creator
export function handleInitialData() {
  return dispatch => {
    return getDecks()
        .then((decks) => {
        dispatch(receiveDecks(decks));
    });
  };
}
