import React, { Component } from "react";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "./../actions/router";
import {
    changePasswordWithResetToken,
    passwordTooShortError,
    passwordMismatchError
} from '../actions/user';

import queryString from 'query-string';

import { Form, Container, Header, Message, Button } from "semantic-ui-react";
import NavBarAlternate from "./NavBarAlternate";

class ResetPasswordEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirmPassword: ""
        };
    }

    validatePassword = () => {
        const params = queryString.parse(this.props.location.search);
        const { password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            this.props.passwordMismatchError();

            return;
        }

        if (password.length < 6) {
            this.props.passwordTooShortError();

            return;
        }

        this.props.changePasswordWithResetToken({
            token: params.reset_password_token,
            password: password,
            password_confirmation: confirmPassword,
        });
    };

    render() {
        const params = queryString.parse(this.props.location.search);

        const {error, errorMessage, isLoading} = this.props.user;

        return (
            <div>
                <NavBarAlternate push={this.props.push} />
                <Container style={{ width: "520px" }}>
                    <div>
                        <Header size="large">Reset Password</Header>
                        {params.reset_password_token ? (
                            <Message content="Create a new password." />
                        ) : (
                                <Message negative content="No reset token detected" />
                            )}

                        {error && (
                            <Message
                                negative
                                content={errorMessage}
                            />
                        )}
                    </div>

                    <br />

                    {params.reset_password_token && (
                        <Form>
                            <Form.Field>
                                <label>Password</label>
                                <input
                                    value={this.state.password}
                                    placeholder="Password"
                                    type="password"
                                    onChange={evt => {
                                        this.setState({ error: false });
                                        this.setState({
                                            password: evt.target.value
                                        });
                                    }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Confirm password</label>
                                <input
                                    value={this.state.confirmPassword}
                                    placeholder="Confirm password"
                                    type="password"
                                    onChange={evt => {
                                        this.setState({ error: false });
                                        this.setState({
                                            confirmPassword: evt.target.value
                                        });
                                    }}
                                />
                            </Form.Field>
                            {isLoading ? (
                                <Button positive loading>
                                    Change my password
                                </Button>
                            ) : (
                                <Button positive onClick={this.validatePassword}    >Reset my password
                                </Button>
                                )}
                        </Form>
                    )}

                    {!params.reset_password_token && (
                        <Button positive onClick={() => this.props.push("/reset_password")}>
                            Request password reset
                        </Button>
                    )}
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            changePasswordWithResetToken,
            passwordTooShortError,
            passwordMismatchError,
            push
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPasswordEdit);

export { ResetPasswordEdit };

