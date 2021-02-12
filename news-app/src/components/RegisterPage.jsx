import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { postUser, login } from "../api";
import { Link } from "@reach/router";

class RegisterPage extends Component {
  state = {
    username: "",
    password: "",
    name: "",

    nametextmuted: "",
    errMsg: "",
  };

  handleChange = (event) => {
    console.dir(this.props);
    const firstLastNameRegex = {
      reg: /^[a-z\s-']*$/i,
      msg: "only allow letter, spaces, hyphens and  apostrophes",
    };
    if (event.target.id === "registerform__realname") {
      if (!firstLastNameRegex.reg.test(event.target.value))
        this.setState({ nametextmuted: firstLastNameRegex.msg });
      else
        this.setState({
          name: event.target.value,
          nametextmuted: "",
          errMsg: "",
        });
    }
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
      postUser(this.state.username, this.state.password, this.state.name)
        .then(({ user }) => {
          return Promise.all([user, login(user.username, user.password)]);
        })
        .then(([user, { token }]) => {
          this.props.changeUsername(user.username, token);
          this.props.navigate("/");
        })
        .catch((err) => {
          this.setState({ errMsg: "username has been taken", password: "" });
        });
    }
  };

  render() {
    return (
      <div className="registerpage">
        <Form className="registerform" onSubmit={this.handleSubmit}>
          <h1 className="font-weight-bold">Hello, new user</h1>
          <Form.Group controlId="registerform__username">
            <Form.Label className="registerform__usernamelabel">
              Username
            </Form.Label>
            <Form.Control
              className="registerform__usernameinput"
              size="lg"
              type="username"
              placeholder="Enter username"
              onChange={this.handleChange}
              value={this.state.username}
            />
          </Form.Group>

          <Form.Group controlId="registerform__password">
            <Form.Label className="registerform__passwordlabel">
              Password
            </Form.Label>
            <Form.Control
              className="registerform__passwordinput"
              size="lg"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Group>

          <Form.Group controlId="registerform__realname">
            <Form.Label className="registerform__realnamelabel">
              Your name
            </Form.Label>
            <Form.Control
              className="registerform__realnameinput"
              size="lg"
              type="name"
              placeholder="Name"
              onChange={this.handleChange}
              value={this.state.name}
            />
            {this.state.nametextmuted ? (
              <Form.Text className="text-muted">
                {" "}
                {this.state.nametextmuted}
              </Form.Text>
            ) : null}
          </Form.Group>

          {this.state.errMsg ? (
            <p className="registerpage__err">{this.state.errMsg}</p>
          ) : null}
          <Button
            variant="primary"
            type="submit"
            className="registerform__registerbutton btn-lg btn-block"
          >
            Register
          </Button>

          <Link to="/login" className="loginblock__registerlink">
            Already a user?
          </Link>
        </Form>
      </div>
    );
  }
}

export default RegisterPage;
