import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Item from '../components/Item';
import { getItems, changeSku, changeCount, removeItem } from '../actions/items';
import { texts } from '../data';

class Items extends Component {

  componentWillMount() {
    this.props.itemActions.getItems();
  }

  calculateTotalPrice = (items) => {
    let totalPrice = 0;
    if (items.size) {
      items.valueSeq().forEach(v => {
        const count = v.get('count');
        const active = v.get('active');
        const sku = v.get('sku').toJS();

        totalPrice += count * sku[active].price;
      });
    }
    return `${totalPrice.toFixed(2)} €`;
  };

  render() {
    const { items: storeData, itemActions: { changeSku, changeCount, removeItem } } = this.props;
    const items = storeData.get('items');
    const failed = storeData.get('failed');
    let alert = '';
    if (failed) {
      alert = texts.apiError;
    }

    return (
      <div className="yellow-container">
        <div className="white-container">
          {items.size > 0 &&
          <div className="items-container">
              {items.map((item, key) =>
                <Item key={ key }
                  onChangeSku={ changeSku }
                  onChangeCount={ changeCount }
                  onRemoveItem={ removeItem }
                  {...item.toJS()}
                />).toJS()
              }
          </div>
          }
          {items.size > 0 &&
            <div className="total-price-container">
              <div className="value">{ this.calculateTotalPrice(items) }</div>
            </div>
          }
          {alert &&
            <div className="items-alert">{ alert }</div>
          }
        </div>
      </div>
    );
  }
}

export default connect(
  ({reducer}) => ({items: reducer}),
  dispatch => ({itemActions: bindActionCreators({ getItems, changeSku, changeCount, removeItem}, dispatch)})
)(Items);