import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "@reach/router";
import { login } from "../api";
class LogIn extends Component {
  state = {
    username: "",
    password: "",
    errMsg: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id.split("__").slice(-1)[0]]: event.target.value,
      errMsg: "",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.username || !this.state.password) {
      this.setState({ errMsg: "all fields cannot be empty" });
    } else {
      login(this.state.username, this.state.password)
        .then(({ token }) => {
          this.props.changeUsername(this.state.username, token);
          this.props.navigate("/");
        })
        .catch((err) => {
          this.setState({ errMsg: "please check your username and password" });
        });
    }

    //  this.props.history.push('/dashboard')
    // loginIn;
  };

  render() {
    return (
      <div className="loginblock">
        <Form className="loginblock__form" onSubmit={this.handleSubmit}>
          <Form.Group controlId="loginblock__form__username">
            <Form.Label>username</Form.Label>
            <Form.Control
              className="loginblock__form__usernameInput"
              type="username"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="loginblock__form__password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="loginblock__form__passwordInput"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>
          {this.state.errMsg ? (
            <p className="loginblock_err">{this.state.errMsg}</p>
          ) : null}
          <Button variant="primary" type="submit">
            Login
          </Button>
          <Link to="/newuser"> Not registered? </Link>
        </Form>
      </div>
    );
  }
}

export default LogIn;
