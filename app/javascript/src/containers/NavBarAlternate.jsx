import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// redux actions
import { push } from './../actions/router';

// semantic-ui
import { Menu, Icon, Image } from 'semantic-ui-react';

// images
import * as logo from './../images/gthc.png';

class NavBarAlternate extends Component {
  constructor(props) {
    super(props);
    this.navigateTo = this.navigateTo.bind(this);
  }

  navigateTo = route => {
    this.props.push(route);
  };

  render() {
    const { router } = this.props;
    const path = router.location.pathname;

    return (
      <div style={{ paddingBottom: '75px'}}>
        <Menu
          stackable
          fixed="top"
        >
          <Menu.Item
            header
            fitted="vertically"
          >
            <Image src={logo} size="tiny" />
          </Menu.Item>
          <Menu.Item
            id="login"
            active={path == '/' | path == '/login'}
            onClick={() => this.navigateTo('/login')}
          >
            <Icon name="sign in" />
            Login
          </Menu.Item>
            <Menu.Item
              id="about"
              active={path == '/about' | path == '/about/gthc'}
              onClick={() => this.navigateTo('/about/gthc')}>
              About GTHC
            </Menu.Item>
            <Menu.Item
              id="aboutus"
              active={path == '/about/us'}
              onClick={() => this.navigateTo('/about/us')}>
                About Us
              </Menu.Item>
            <Menu.Item
              active={path == '/about/tenting'}
              id="tenting101"
              onClick={() => this.navigateTo('/about/tenting')}
            >
                About Tenting
            </Menu.Item>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  router: state.router,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(
    {
      push: push,
    },
    dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(NavBarAlternate);

export {
  NavBarAlternate
};
