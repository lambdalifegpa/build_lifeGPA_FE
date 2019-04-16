import React from "react";
import axios from "axios";
import {BrowserRouter as Route, Link} from "react-router-dom";
import './SignUp.css'

class SignUp extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props.history)
    const credentials = this.state;
    axios
      .post("http://lifegpadb.herokuapp.com/api/users/register", credentials)
      .then(res => {
        const token = res.data.payload;
        localStorage.setItem("token", token);
        
      })
      .catch(err => console.log(err.response));
      this.props.history.push("/login");
  };

  render() {
    return (
      <div className='signUp'>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
            <div className='form'>
                <input
                    className='signUpInput firstName'
                    type="firstName"
                    name="firstName"
                    placeholder='First name'
                    onChange={this.handleChange}
                    value={this.state.firstName}
                    required
                />
                <input
                    className='signUpInput lastName'
                    type="lastName"
                    name="lastName"
                    placeholder='Last name'
                    onChange={this.handleChange}
                    value={this.state.lastName}
                    required
                />
                <input
                    className='signUpInput username'
                    type="username"
                    name="username"
                    placeholder='Username'
                    onChange={this.handleChange}
                    value={this.state.username}
                    required
                />
                <input
                    className='signUpInput password'
                    type="password"
                    name="password"
                    placeholder='Password'
                    onChange={this.handleChange}
                    value={this.state.password}
                    required
                />
          </div>
          <button className='signUpButton' >Create Account</button>
        </form>

        

        <div className="loginLink">
            <p>Already Have an Acount?</p>
            <pre>  </pre>
            <Link to="/login">Login</Link>
        </div>

      </div>
    );
  }
}
export default SignUp;