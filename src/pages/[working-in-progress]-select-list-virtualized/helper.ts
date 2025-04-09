import { State } from './types';

export type Action =
  | { type: 'SET_SELECTED'; payload: State['selected'] }
  | { type: 'SET_SCROLL_TOP'; payload: State['scrollTop'] }
  | { type: 'SET_CONTAINER_HEIGHT'; payload?: State['height'] }
  | { type: 'SET_ITEM_HEIGHT'; payload?: State['itemHeight'] }
  | { type: 'TOGGLE_OPEN' }
  | { type: 'RESET_STATE' };

export const initialReduce: State = {
  selected: null,
  scrollTop: 0,
  open: false,
  height: 1,
  itemHeight: 1,
};

export const reducer = (prevState: State, action: Action): State => {
  const state = { ...prevState };

  switch (action.type) {
    case 'SET_SELECTED':
      state.open = initialReduce.open;
      state.selected = action.payload;
      return state;

    case 'SET_SCROLL_TOP':
      state.scrollTop = action.payload;
      return state;

    case 'TOGGLE_OPEN':
      state.scrollTop = state.open ? state.scrollTop : initialReduce.scrollTop;
      state.open = !state.open;
      return state;

    case 'SET_CONTAINER_HEIGHT':
      state.height = action.payload ?? initialReduce.height;
      return state;

    case 'SET_ITEM_HEIGHT':
      state.itemHeight = action.payload ?? initialReduce.itemHeight;
      return state;

    case 'RESET_STATE':
      state.selected = initialReduce.selected;
      state.scrollTop = initialReduce.scrollTop;
      state.open = initialReduce.open;
      state.height = initialReduce.height;
      state.itemHeight = initialReduce.itemHeight;
      return state;

    default:
      return prevState;
  }
};
