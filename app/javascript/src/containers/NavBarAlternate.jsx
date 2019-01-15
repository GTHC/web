import React, { Component } from "react";

import * as logo from "./../images/gthc.png";

import { Menu, Icon, Image } from "semantic-ui-react";

class NavBarAlternate extends Component {
    constructor(props) {
        super(props);
        this.navigateTo = this.navigateTo.bind(this);
    }

    navigateTo = route => {
        this.props.push(route);
    };

    render() {
        const { context } = this.props;

        return <div style={{ borderBottom: "1px solid #001A57" }}>
            <Menu secondary>
              <Menu.Item header>
                <Image src={logo} size="tiny" />
              </Menu.Item>
              <Menu.Item id="about" onClick={() => this.navigateTo("/about")}>
                About GTHC
              </Menu.Item>
              {context === "/login" && <Menu.Item id="tenting101" onClick={() => this.navigateTo("/tenting101")}>
                  Tenting 101
                </Menu.Item>}
              {context !== "/login" && <Menu.Item id="login" onClick={() => this.navigateTo("/login")}>
                  <Icon name="sign in" />
                  Login
                </Menu.Item>}
            </Menu>
          </div>;
    }
}

export default NavBarAlternate;

