import { ADD_DECK, RECEIVE_DECKS, REMOVE_DECK, ADD_CARD, CLEAR_DECKS } from '../actions';
import { getDefaultDecks } from "..utils/api";
  
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

    case REMOVE_DECK:
      const { [action.id]: value, ...remainingDecks } = state;
      return remainingDecks;

    case ADD_CARD:
      const { card, title } = action
      data = state.decks
      return {
          ...state,
          decks: {
              ...data,
              [title]: {
                  title: title,
                  questions: data[title].questions.concat([card])
              }
          }
      };

    case CLEAR_DECKS:
      return getDefaultDecks()

    default:
      return state;
  }
}
  