import React from "react";
import axios from "axios";
import './Login.css'
import {BrowserRouter as Route, Link} from "react-router-dom";
import NavBar from './navbar1'


class Login extends React.Component {
  state = {
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
    const credentials = this.state;
    axios
      .post("http://lifegpadb.herokuapp.com/api/users/login", credentials)
      .then(res => {
        console.log(res.data , '5')
        const token = res.data.token;
        const id = res.data.id;
        localStorage.setItem("token", token);
        localStorage.setItem('id', id )
        this.props.history.push("/home");
      })
      .catch(err => console.log(err.response));
  };

  render() {
    return (
        <div>
            <NavBar />
            <div className='login'>
                <h1>Login</h1>
                <form className='loginForm' onSubmit={this.handleSubmit}>
                  <div className='inputs'>
                    <input
                        className='loginInput username1'
                        type="username"
                        name="username"
                        placeholder='Username'
                        onChange={this.handleChange}
                        value={this.state.username}
                        required
                    />
                    <input
                        className='loginInput password1'
                        type="password"
                        name="password"
                        placeholder='Password'
                        onChange={this.handleChange}
                        value={this.state.password}
                        required
                    />
                  </div>
                  <button onClick={this.handleSubmit} className='loginButton'>Login</button>
                </form>

                

                <div className="createNewAccountLink">
                    <p>New to LifeGPA?</p>
                    <pre>  </pre>
                    <Link to="/signUp" className='signUpLink'>Create an Account</Link>
                </div>
            </div>
        </div>
    );
  }
}
export default Login;
