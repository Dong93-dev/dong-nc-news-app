import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "@reach/router";
import { login } from "../api";
import styled from "styled-components";

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
          <h1>
            {" "}
            Welcome to{" "}
            <span className="font-weight-bold loginblock__form__title">
              NC NEWS
            </span>
          </h1>
          <Form.Group controlId="loginblock__form__username">
            <Form.Label className="loginblock__form__usernamelabel">
              Username
            </Form.Label>
            <Form.Control
              size="lg"
              className="loginblock__form__usernameInput"
              type="username"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="loginblock__form__password">
            <Form.Label className="loginblock__form__passwordlabel">
              Password
            </Form.Label>
            <Form.Control
              className="loginblock__form__passwordInput"
              type="password"
              size="lg"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>
          {this.state.errMsg ? (
            <p className="loginblock__err">{this.state.errMsg}</p>
          ) : null}
          <Button
            variant="primary"
            type="submit"
            className="loginblock__button btn-lg btn-block"
          >
            Login
          </Button>
          <Link to="/newuser" className="loginblock__registerlink">
            {" "}
            Not registered?{" "}
          </Link>
        </Form>
      </div>
    );
  }
}

export default LogIn;
