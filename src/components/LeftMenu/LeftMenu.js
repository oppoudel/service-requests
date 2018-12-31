import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import "./LeftMenu.css";

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: "map"
    };
  }

  render() {
    const { days, handleItemClick } = this.props;
    return (
      <div>
        <div className="left-menus">
          <Menu vertical>
            <Menu.Item active={days === 3} onClick={() => handleItemClick(3)}>
              Last 3 Days
            </Menu.Item>

            <Menu.Item active={days === 7} onClick={() => handleItemClick(7)}>
              Last 7 Days
            </Menu.Item>
            <Menu.Item active={days === 15} onClick={() => handleItemClick(15)}>
              Last 15 Days
            </Menu.Item>
            <Menu.Item active={days === 30} onClick={() => handleItemClick(30)}>
              Last 30 Days
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}

export default LeftMenu;
