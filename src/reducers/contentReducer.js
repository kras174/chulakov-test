import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR, FAVOURITE_HANDLER } from "../actions/contentActions";
import { SORT_BUTTON_CLICK, DIRECTION_BUTTON_CLICK } from "../actions/sortActions";

const initialState = {
  usersList: [],
  isFetching: false,
  sortType: "",
  sortDirection: "",
  error: "",
};

export function contentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        usersList: action.payload,
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    case FAVOURITE_HANDLER:
      return { ...state, usersList: action.payload };
    case SORT_BUTTON_CLICK:
      return { ...state, sortType: action.payload };
    case DIRECTION_BUTTON_CLICK:
      return { ...state, sortDirection: action.payload };
    default:
      return state;
  }
}
