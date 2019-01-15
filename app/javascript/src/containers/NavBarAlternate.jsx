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
          <Menu.Item header>
            <Image src={logo} size="tiny" />
          </Menu.Item>
          {
            path !== '/about' &&
            <Menu.Item
              id="about"
              onClick={() => this.navigateTo('/about')}>
              About GTHC
            </Menu.Item>
          }
          {
            path !== '/login' &&
            <Menu.Item
              id="login"
              onClick={() => this.navigateTo('/login')}
            >
              <Icon name="sign in" />
              Login
            </Menu.Item>
          }
          {
            path !== '/tenting101' &&
            <Menu.Item
              id="tenting101"
              onClick={() => this.navigateTo('/tenting101')}
            >
                Tenting 101
            </Menu.Item>
          }
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
