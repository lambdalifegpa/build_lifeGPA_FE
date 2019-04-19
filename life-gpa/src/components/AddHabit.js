import React from "react";
import axios from "axios";
import axiosWithHeaders from "../authentication/axiosWithAuthen";
import './homePage.css'

class AddHabit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habit: "",
      
    };
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const newHabit = this.state;
    const user_id = localStorage.getItem('id')
    const sentItems = {...newHabit, user_id}
    axiosWithHeaders()
      .post("http://lifegpadb.herokuapp.com/api/habits", sentItems)
      .then(res => {
          console.log(res)
          this.props.getHabits()
          this.setState({habit: ''})
      })
      .catch(err => console.log(err.response));
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  render() {
    console.log()
    return (
      <div className='addHabitForm'>
        <form className='addHabit' onSubmit={this.handleSubmit}>
          <input
            className='addHabitInput'
            type="text"
            name="habit"
            placeholder='Add New Habit...'
            onChange={this.handleChange}
            value={this.state.habit}
          />
          
          <button className='addingNewHabitButton'>Add New Habit</button>
        </form>
      </div>
    );
  }
}
export default AddHabit;
