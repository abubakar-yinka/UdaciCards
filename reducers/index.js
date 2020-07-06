import { ADD_DECK, RECEIVE_DECKS, ADD_CARD, CLEAR_CUSTOM_DECKS } from '../actions/index';
import { decks as defaultState } from '../utils/api';

export default function decks(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      const { title } = action;
      return {
        ...state,
        [title]: {
          title,
          questions: []
        }
      };

    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };

      case ADD_CARD:
        const { deckId, card } = action;
        return {
          ...state,
          [deckId]: {
            ...state[deckId],
            questions: [...state[deckId].questions].concat(card)
          }
        };

      case CLEAR_CUSTOM_DECKS:
        return defaultState;
  
      default:
        return state;
    }
  }

  