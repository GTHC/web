import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from './../actions/router';
import { initiatePasswordReset, invalidEmailError } from '../actions/user';

import { Form, Container, Header, Message, Button} from 'semantic-ui-react';
import NavBarAlternate from './NavBarAlternate';

class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
        }

        this.validateEmail = this.validateEmail.bind(this);
    }

    validateEmail = () => {
        // Regular exp that validates email
        const validEmailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/i;

        const isValidEmail = validEmailPattern.test(this.state.email);

        if (isValidEmail) {
            const apiParams = {
                user_email: this.state.email,
            }
            this.props.initiatePasswordReset(apiParams);
        } else {
            this.props.invalidEmailError();
        }
    }

    inputChanged = (evt) => {
        this.setState({
            email: evt.target.value,
        });
    }

    render() {
        const {
            passwordResetSuccess,
            isLoading,
            error,
            errorMessage,
        } = this.props.user;

        return (
            <div>
                <NavBarAlternate
                    push={this.props.push}
                />
                <Container style={{ width: "520px", marginTop: "24px" }}>
                    <div>
                        <Header size="large">Forgot Password?</Header>

                        {error && <Message negative content={errorMessage} />}

                        {passwordResetSuccess ? (
                            <Message
                                positive
                                content="A password resend link has been sent to your email."
                            />
                        ) : (
                                <Message content="Enter your GTHC email to get a link allowing you to reset your password." />
                            )}
                    </div>

                    <br />

                    {!passwordResetSuccess && (
                        <Form>
                            <Form.Field>
                                <label>Email</label>
                                <input
                                    value={this.state.email}
                                    onChange={this.inputChanged}
                                    placeholder="Email"
                                />
                            </Form.Field>
                            {isLoading ? (
                                <Button positive loading>Reset my password</Button>
                            ) : (
                                    <Button positive onClick={this.validateEmail}>Reset my password</Button>
                                )}
                        </Form>
                    )}
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            initiatePasswordReset,
            invalidEmailError,
            push,
        },
        dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

export {
    ResetPassword
};
