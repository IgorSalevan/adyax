import React, { Component } from 'react';
import SkuDropdown from '../SkuDropdown/SkuDropdown';
import PropType from 'prop-types';

class Item extends Component {
  static propTypes = {
    onChangeSku: PropType.func,
    onChangeCount: PropType.func,
    onRemoveItem: PropType.func
  };

  onChangeSkuHandler = (skuKey) => {
    const { props: { id: itemId, count: itemsCount, sku, onChangeSku } } = this;
    onChangeSku(itemId, skuKey, sku, itemsCount);
  };

  onIncreaseCountHandler = () => {
    this.changeCount(1);
  };

  onDecreaseCountHandler = () => {
    this.changeCount(-1);
  };

  changeCount = (addCount) => {
    const { props: { id: itemId, count: itemsCount, sku, active: skuKey, onChangeCount } } = this;

    onChangeCount(itemId, skuKey, sku, itemsCount, addCount);
  };

  countBtnClassName = (item, plus) => {
    const { props: {count, active, sku} } = item;
    let name = 'item-btn';

    if ((plus && (count === sku[active].max)) || (!plus && (count === sku[active].min))) {
      name += ' disabled';
    }
    return name;
  }

  onRemoveItemHandler = () => {
    const { id: itemId, onRemoveItem } = this.props;

    onRemoveItem(itemId);
  }

  render() {
    const { props: { title, description, sku, active, count } } = this;
    const item = sku[active];
    return (
      <div className="item">
        <div className="image-container">
          <img src={ item.image } className="image" alt={ item.title }/>
        </div>
        <div className="data-container">
          <div className="title">{ title }</div>
          <div className="description">{ description } </div>
          <SkuDropdown item={ this.props } onChange={ this.onChangeSkuHandler } />
        </div>
        <div className="quantity">
          <div className={ this.countBtnClassName(this, false) } onClick={ this.onDecreaseCountHandler } >
            <div className="sign">-</div>
          </div>
          <div className="count">{ count }</div>
          <div className={ this.countBtnClassName(this, true) } onClick={ this.onIncreaseCountHandler }>
            <div className="sign">+</div>
          </div>
        </div>
        <div className="item-right-block">
          <div className="trash-btn" onClick={ this.onRemoveItemHandler } />
          <div className="price">{ (count * item.price).toFixed(2) }  €</div>
        </div>
      </div>
    );
  }
}

export default Item;
