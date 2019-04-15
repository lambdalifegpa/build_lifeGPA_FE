import React from 'react'

class HomePage extends React.Component {
    state = {
      Data: [],
      isLoggedIn: false
    };

    // componentDidMount() {
    //   axiosWithHeaders()
    //     .get("http://localhost:5000/")
    //     .then(res => {
    //       this.setState({
    //         Data: res.data
    //       });
    //     })
    //     .catch(err => console.log("Data Failed", err.response));
    // }

    // handleDelete = (e, id) => {
    //   e.preventDefault();
    //   axiosWithHeaders()
    //     .delete(`http://localhost:5000/api/data/${id}`)
    //     .then(res => this.setState({ Data: res.data }))
    //     .catch(err => err.response);
    // };

    logOut = e => {
        e.preventDefault();
        localStorage.removeItem("token");
        this.props.history.push("/login");
    };

    render() {
    //   if (!localStorage.getItem("token")) {
    //     return <h1>You are not authorized</h1>;
    //   }
      return (
        <div>
          <h1>HomePage</h1>
          <button onClick={this.logOut}>Sign Out</button>
        </div>
      );
    }
}
  
export default HomePage;
  