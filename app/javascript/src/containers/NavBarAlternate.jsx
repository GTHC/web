import React, { Component } from 'react';

import * as logo from './../images/gthc.png';

import { Menu, Icon, Image } from 'semantic-ui-react'

class NavBarAlternate extends Component {
    constructor(props) {
        super(props);
        this.navigateTo = this.navigateTo.bind(this);
    }

    navigateTo = (route) => {
        this.props.push(route);
    }

    render() {
        return (
            <div>
                <Menu secondary>
                <Menu.Item header>
                    <Image src={logo} size="tiny" />
                </Menu.Item>
                <Menu.Item
                    id="about"
                    onClick={() => this.navigateTo('/about')}
                >
                    About GTHC
                </Menu.Item>
                <Menu.Item
                    id="login"
                    onClick={() => this.navigateTo('/login')}
                >
                    <Icon name="sign in" />
                    Login
                </Menu.Item>
                </Menu>
            </div>
);
    }
}

export default NavBarAlternate;