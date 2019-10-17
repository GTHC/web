import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// semantic ui components
import { Container, Card, Image } from 'semantic-ui-react';

import NavBarAlternate from './NavBarAlternate';

// images
import * as loginButtonLight from './../images/netid-login.png';
import * as loginButtonDark from './../images/netid-login-dark.png';
import * as logo from './../images/gthc_long.png';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginButton: loginButtonLight,
    };
  }

  changeButtonToDark = () => (this.setState({ loginButton: loginButtonDark }));

  changeButtonToLight = () => (this.setState({ loginButton: loginButtonLight }));

  render() {
    const cardStyle = {
        width: "520px",
        paddingBottom: "16px",
    };

    const logoStyle = {
      paddingBottom: '12px',
      paddingLeft: '3px',
    };

    return (
      <div>
        <NavBarAlternate />

        <div className="login">
          <Container>
            <Card
              centered
              color="blue"
              className="login-card"
              style={cardStyle}
            >
              <Card.Content>
                <Card.Header>
                  <div>
                    Sign in to
                    <Image src={logo} style={logoStyle} size="medium" />
                  </div>
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <Image
                  src={this.state.loginButton}
                  href="/auth/gthc_oauth2"
                  onMouseEnter={this.changeButtonToDark}
                  onMouseLeave={this.changeButtonToLight}
                />
              </Card.Content>
            </Card>
          </Container>
        </div>
      </div>
    );
  }
}

export default Login;
