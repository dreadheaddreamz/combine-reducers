import { combineReducers } from "redux";
import uuid from "uuid";

const rootReducer = combineReducers({
  authors: authorsReducer ,
  books: booksReducer
});

export default rootReducer;

function booksReducer(state = [], action) {
  let idx;
  switch(action.type) {
    case "ADD_BOOK":
      return [...state, action.book]

    case "REMOVE_BOOK":
      idx = state.findIndex(book => book.id === action.id)
      return [...state.slice(0, idx), ...state.slice(idx + 1)]

      default:
        return state;
  }
}

function authorsReducer(state = [], action) {
  let idx;
  switch(action.type) {
    case "ADD_AUTHOR":
      let exsisting = state.filter( 
        author => author.name === action.book.authorName
      );
      if (exsisting.length > 0) {
        return state;
      } else {
        return [...state, {authorName: action.book.authorName, id: uuid() }]
      }

    case "REMOVE_BOOK": 
      idx = state.findIndex(author => author.id === action.id)
      return [...state.slice(0, idx), ...state.slice(idx + 1)]

      default:
        return state;
  }

}