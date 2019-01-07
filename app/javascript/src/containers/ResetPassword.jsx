import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initiatePasswordReset } from '../actions/user';

import { Form, Container, Header, Message, Button} from 'semantic-ui-react'

class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            isLoading: false,
            success: false,
            error: false,
            errorMessage: '',
        }
    }

    validateEmail = () => {
        // Regular exp that validates email
        const validEmailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/i;

        const isValidEmail = validEmailPattern.test(this.state.email);

        if (isValidEmail) {
            const apiParams = {
                user_email: this.state.email,
            }
            initiatePasswordReset(apiParams);
        } else {
            this.setState({
                error: true,
                errorMessage: 'Please enter a valid email',
            })
        }
    }

    inputChanged = (evt) => {
        this.setState({
            email: evt.target.value,
            error: false,
        });
    }

    render() {
        return (
            <Container style={{ width: "520px" }}>
                <div>
                    <Header size="large">Forgot Password?</Header>

                    {this.state.error && <Message negative content={this.state.errorMessage} />}

                    {this.state.success ? (
                        <Message
                            positive
                            content="A password resend link has been sent to your email."
                        />
                    ) : (
                            <Message content="Enter your GTHC email to get a link allowing you to reset your password." />
                        )}
                </div>

                <br />

                {!this.state.success && (
                    <Form>
                        <Form.Field>
                            <label>Email</label>
                            <input
                                value={this.state.email}
                                onChange={this.inputChanged}
                                placeholder="Email"
                            />
                        </Form.Field>
                        {this.state.isLoading ? (
                            <Button loading>Reset my password</Button>
                        ) : (
                                <Button onClick={this.validateEmail}>Reset my password</Button>
                            )}
                    </Form>
                )}
            </Container>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            initiatePasswordReset,
        },
        dispatch);
};

export default connect(null, mapDispatchToProps)(ResetPassword);

export {
    ResetPassword,
};
