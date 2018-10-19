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
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS:
      return state.set('items', fromJS(action.payload));
    case FETCH_ITEMS_FAILED:
      return state.set('failed', true);
    case ITEMS_CHANGE_SKU: {
      const { itemId, skuKey, itemsCount } = action;
      const itemIndex = state.get('items').findKey(item => item.get('id') === itemId);

      return state
        .setIn(['items', itemIndex, 'active'], skuKey)
        .setIn(['items', itemIndex, 'count'], itemsCount);
    }
    case ITEMS_CHANGE_COUNT: {
      const { itemId: id, count } = action;
      const itemIndex = state.get('items').findKey(item => item.get('id') === id);

      return state.setIn(['items', itemIndex, 'count'], count);
    }
    case ITEM_REMOVE: {
      const itemIndex = state.get('items').findKey(item => item.get('id') === action.itemId);

      return state.removeIn(['items', itemIndex]);
    }
    default:
      return state;
  }
}
