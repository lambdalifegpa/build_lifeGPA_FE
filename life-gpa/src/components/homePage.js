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
   this.getHabits()
  }

  getHabits = () => {

    console.log('getHabits() invoked');
    
    const userId = localStorage.getItem("id");
    
    console.log(userId)

    axiosWithHeaders()
      .get(`http://lifegpadb.herokuapp.com/api/users/${userId}/habits`)
      .then(res => {
        console.log(res.data)
        res.data.habits.sort((a, b) => {
          return a.id - b.id
        })
        this.setState({
          habits: res.data.habits
        });
      })
      .catch(err => console.log("Data Failed", err));
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
      let lastCompleteDate = new Date(habit.created_at);
      lastCompleteDate.setHours(0,0,0,0)
      console.log("lastCompleteDate:", lastCompleteDate)

      let today = new Date();
      today.setHours(0,0,0,0)
      console.log("today:", today)

      let daysSinceHabitStart;

      if (today - habit.created_at > 0) {
        daysSinceHabitStart = (today - habit.created_at) / 1000 / 60 / 60 / 24
      } else {
        daysSinceHabitStart = 1
      }
      console.log("daysSinceHabitStart:", daysSinceHabitStart)

      const habitGPA = habit.count / daysSinceHabitStart
      console.log("habitGPA:", habitGPA)

      lifeCount += habitGPA
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