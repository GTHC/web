import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// semantic ui components
import { Container, Card } from 'semantic-ui-react';

// Login components
import { LoginFields, SignUpFields } from './../components';

// redux actions
import { toggleLoginType, toggleDisableNext } from './../actions/login';

class Login extends Component {

  render() {
    const { login, toggleLoginType, toggleDisableNext } = this.props;
    return (
      <div className="login">
        <Container textalign="center" >
          <Card centered fluid color="blue" className="login-card" >
            <Card.Content>
              <Card.Header>
                { login.type === 'login' ? '⛺⛺ Welcome to your K-Ville Scheduler! ⛺⛺' :
                  '🤝🤝 Pleased to meet you! 🤝🤝'
                }
              </Card.Header>
            </Card.Content>
            <Card.Content>
              { login.type === 'login' && <LoginFields toggleLoginType={toggleLoginType} login={login} /> }
              { login.type === 'signup' && <SignUpFields toggleLoginType={toggleLoginType} toggleDisableNext={toggleDisableNext} login={login} /> }
            </Card.Content>
          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      toggleLoginType: toggleLoginType,
      toggleDisableNext: toggleDisableNext,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

export {
  Login
};
