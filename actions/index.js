import { getDecks } from '../utils/api';

//action types
export const ADD_DECK = 'ADD_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_CARD = 'ADD_CARD';
export const CLEAR_CUSTOM_DECKS = 'CLEAR_CUSTOM_DECKS';


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

export function addCardToDeck(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card
  };
}

export function clearCreatedDecks() {
  return {
    type: CLEAR_CUSTOM_DECKS,
  };
}

//asynchronous action creator
export function handleInitialData() {
  return dispatch => {
    return getDecks()
        .then(decks => {
        dispatch(receiveDecks(decks));
    });
  };
}



