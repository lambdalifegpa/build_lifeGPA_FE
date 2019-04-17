import React from "react";
import axios from "axios";
import {BrowserRouter as Route, Link} from "react-router-dom";
import './SignUp.css'
import NavBar from './navbar1'

class SignUp extends React.Component {
  state = {
    first_name: '',
    last_name: '',
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
    // console.log(this.props.history)
    const credentials = this.state;
    axios
      .post("http://lifegpadb.herokuapp.com/api/users/register", credentials)
      .then(res => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        this.props.history.push("/login")
      })
      .catch(err => console.log(err.response));
  };

  render() {
    return (
        <div>
            <NavBar />
            <div className='signUp'>
                <h1>Sign Up</h1>
                <form className='.formContainer' onSubmit={this.handleSubmit}>
                  <div className='form'>
                    <input
                        className='signUpInput firstName'
                        type="first_name"
                        name="first_name"
                        placeholder='First name'
                        onChange={this.handleChange}
                        value={this.state.first_name}
                        required
                    />
                    <input
                        className='signUpInput lastName'
                        type="last_name"
                        name="last_name"
                        placeholder='Last name'
                        onChange={this.handleChange}
                        value={this.state.last_name}
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
                    <Link to="/login" className='signUpLoginLink'>Login</Link>
                </div>

            </div>
        </div>
    );
  }
}

export default SignUp;