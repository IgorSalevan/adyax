const API_URL = 'https://demo0639560.mockable.io/adyax';

export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILED = 'FETCH_ITEMS_FAILED';

export const ITEMS_CHANGE_SKU = 'ITEMS_CHANGE_SKU';
export const ITEMS_CHANGE_COUNT = 'ITEMS_CHANGE_COUNT';

export const ITEM_REMOVE = 'ITEM_REMOVE';

export const getItems = () => {
  return async (dispatch) => {
    try {
      const result = await fetch(API_URL);
      const json = await result.json();
      dispatch({type: FETCH_ITEMS_SUCCESS, payload: json});
    } catch (e) {
      dispatch({type: FETCH_ITEMS_FAILED, e});
    }
  }
};

export const changeSku = (itemId, skuKey, sku, itemsCount) => {
  if (sku[skuKey].max < itemsCount) {
    itemsCount = sku[skuKey].max;
  } else if (sku[skuKey].min > itemsCount) {
    itemsCount = sku[skuKey].min;
  }
  return {type: ITEMS_CHANGE_SKU, itemId, skuKey, itemsCount};
};

export const changeCount = (itemId, skuKey, sku, itemsCount, addCount) => {
  let count = itemsCount + addCount;

  if (count < sku[skuKey].min) {
    count = sku[skuKey].min;
  } else if (count > sku[skuKey].max) {
    count = sku[skuKey].max;
  }
  return {type: ITEMS_CHANGE_COUNT, itemId, count}
};

export const removeItem = (itemId) => {
  return {type: ITEM_REMOVE, itemId}
};