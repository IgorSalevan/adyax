import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

class SkuDropdown extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handleLinkClick(skuKey) {
    const dr = this;
    const { props: { onChange } } = dr;

    return function() {
      dr.dropdown.hide();
      onChange(skuKey);
    }
  }

  render() {
    const {sku: itemSkus, active} = this.props.item;

    return (
      <Dropdown ref={dropdown => this.dropdown = dropdown}>
        <DropdownTrigger>
          <span>{itemSkus[active].code}</span>
        </DropdownTrigger>
        <DropdownContent>
          {itemSkus.map((sku, key) =>
              (<div key={key} className="dropdown__segment" onClick={this.handleLinkClick(key)}>
                    {sku.code}
                </div>
              )
            )
          }
        </DropdownContent>
      </Dropdown>
    );
  }
}

export default SkuDropdown;