import React from "react";
import NavBar2 from "./navBar2";
import "./homePage.css";
import AddHabit from "./AddHabit";
import axios from "axios";
import axiosWithHeaders from "../authentication/axiosWithAuthen";
import Habit from "./Habit";

class HomePage extends React.Component {
  state = {
    habits: [],
    completed: false,
    editHappening: false,
    editId: null
  };

  logOut = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };

  componentDidMount() {
    // console.log(this.state.habits)
    axiosWithHeaders()
      .get("http://lifegpadb.herokuapp.com/api/habits/")
      .then(res => {
        console.log(res.data);
        this.setState({
          habits: res.data
        });
      })
      .catch(err => console.log("Data Failed", err.response));
  }

  getHabits = () => {
    console.log('getHabits() invoked')
    axiosWithHeaders()
      .get("http://lifegpadb.herokuapp.com/api/habits/")
      .then(res => {
        console.log(res.data)
        res.data.sort((a, b) => {
          return a.id - b.id
        })
        this.setState({
          habits: res.data
        });
      })
      .catch(err => console.log("Data Failed", err.response));
  };

  handleDelete = (e, id) => {
    console.log('working')
    e.preventDefault();

    axiosWithHeaders()
      .delete(`http://lifegpadb.herokuapp.com/api/habits/${id}`)
      .then(() => {
        axiosWithHeaders()
          .get("http://lifegpadb.herokuapp.com/api/habits/")
          .then(res => {
            this.setState({
              habits: res.data
            });
          })
          .catch(err => console.log("Data Failed", err.response))
      })
  };

  
  render() {
    let lifeCount = 0;

    this.state.habits.map(habit => {
      let dateString1 = habit.created_at;

      let date = dateString1.split("T");

      date = new Date(date[0]);

      lifeCount += habit.count / (Date.now() - date) / 1000 / 60 / 60 / 24;
    });
    let lifeGPA = (lifeCount / this.state.habits.length) * 100;

    return (
      <div>
        <NavBar2 logOut={this.logOut} />
        <div className="top-content">
          <h1 className="tital">Life GPA 4.0</h1>

          <h2 className="addPhoto">{lifeGPA}%</h2>
        </div>

        <div className="bottomContent">
          <h2 className="habitTital">My Habits</h2>

          {this.state.habits.map((habit, index) => (
            <Habit habit={habit} getHabits={this.getHabits}  handleDelete={this.handleDelete}/>
          ))}
        </div>
        <AddHabit getHabits={this.getHabits} />
      </div>
    );
  }
}

export default HomePage;