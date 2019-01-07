import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initiatePasswordReset } from '../actions/user';

import { Form, Container, Header, Message} from 'semantic-ui-react'

class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            error: null,
        }
    }

    validateEmail = () => {
        // regular exp that validates email
        const validEmailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/i;

        const isValidEmail = validEmailPattern.test(this.state.email);

        if (isValidEmail) {
            initiatePasswordReset();
        } else {
            this.setState({
                error: 'Please enter a valid email',
            })
        }
    }

    inputChanged = (evt) => {
        this.setState({
            email: evt.target.value,
            error: null,
        });
    }

    render() {
        return (
            <Container style={{ width: "520px" }}>
                <div>
                    <Header size="large">Forgot Password?</Header>

                    {this.state.error && <Message negative content={this.state.error} />}

                    <Message content="Enter your GTHC email to get a link allowing you to reset your password." />
                </div>

                <br />

                <Form>
                    <Form.Field>
                        <label>Email</label>
                        <input
                            value={this.state.email}
                            onChange={this.inputChanged}
                            placeholder="Email"
                        />
                    </Form.Field>
                    <Form.Button onClick={this.validateEmail}>Reset my password</Form.Button>
                </Form>
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
