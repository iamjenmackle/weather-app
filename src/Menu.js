import React, { Component } from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

class Menu extends Component {

_getInitLocations() {

  const locationList = [
        {id: '2950157', name: 'Land Berlin'},
        {id: '5128638', name: 'New York'},
        {id: '6455259', name: 'Paris'}
      ];

      return locationList.map((location, index) => {
        return (
          <MenuItem eventKey={location.id} key={index}>{location.name}</MenuItem>
        );
      });

};

  render() {
      const locations = this._getInitLocations();
  return (
    <div className="text-center">
      <DropdownButton id="dropdown" title={this.props.location} onSelect={this.props.onSelect}>
         {locations}
      </DropdownButton>
    </div>

  );
  }
}

export default Menu;
