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
      break;
    case FETCH_ITEMS_FAILED:
      newState = newState.set('failed', true);
      break;
    case ITEMS_CHANGE_SKU:
      const { itemId, skuKey, itemsCount } = action;
      itemIndex = newState.get('items').findKey(item => item.get('id') === itemId);
      newState = newState
        .setIn(['items', itemIndex, 'active'], skuKey)
        .setIn(['items', itemIndex, 'count'], itemsCount);
      break;
    case ITEMS_CHANGE_COUNT:
      const {itemId: id, count } = action;
      itemIndex = newState.get('items').findKey(item => item.get('id') === id);
      newState = newState.setIn(['items', itemIndex, 'count'], count);
      break;
    case ITEM_REMOVE:
      itemIndex = newState.get('items').findKey(item => item.get('id') === action.itemId);
      newState = newState.removeIn(['items', itemIndex]);
      break;
    default: {}
  }
  return newState;
}