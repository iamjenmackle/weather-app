import React, { Component } from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

class Menu extends Component {

  render() {
  return (
    <div className="text-center">
      <DropdownButton title={this.props.location} id="dropdown" onSelect={this.props.onSelect}>
         <MenuItem eventKey="2950157">Land Berlin</MenuItem>
         <MenuItem eventKey="5128638">New York</MenuItem>
         <MenuItem eventKey="6455259">Paris</MenuItem>
        </DropdownButton>
    </div>

  );
  }
}

export default Menu;
