import {
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILED,
  ITEMS_CHANGE_SKU,
  ITEMS_CHANGE_COUNT,
  ITEM_REMOVE
} from '../actions/items'
import { fromJS } from 'immutable';

const initialState = fromJS({
  failed: false,
  items: []
});

export default function reducer(state = initialState, action) {
  let newState = state;
  let itemIndex = null;

  switch (action.type) {
    case FETCH_ITEMS_SUCCESS:
      newState = newState.set('items', fromJS(action.payload));
      return newState;
    case FETCH_ITEMS_FAILED:
      return {
        ...newState,
        failed: true
      };
    case ITEMS_CHANGE_SKU:
      const { itemId, skuKey, itemsCount } = action;
      itemIndex = newState.get('items').findKey(item => item.get('id') === itemId);
      newState = newState.setIn(['items', itemIndex, 'active'], skuKey);
      newState = newState.setIn(['items', itemIndex, 'count'], itemsCount);
      return newState;
    case ITEMS_CHANGE_COUNT:
      const {itemId: id, count } = action;
      itemIndex = newState.get('items').findKey(item => item.get('id') === id);
      return newState.setIn(['items', itemIndex, 'count'], count);
    case ITEM_REMOVE:
      itemIndex = newState.get('items').findKey(item => item.get('id') === action.itemId);
      return newState.removeIn(['items', itemIndex]);
    default: {}
  }
  return state;
}