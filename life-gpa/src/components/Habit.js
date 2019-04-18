import React from "react";
import "./homePage.css";
import axiosWithHeaders from '../authentication/axiosWithAuthen'

class Habit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
      editHappening: false
    };
  }
  

  submitUpdate = (e, id) => {
    e.preventDefault();
    axiosWithHeaders()
      .put(`http://lifegpadb.herokuapp.com/api/habits/${id}`, {
        habit: this.state.updateHabit
      })
      .then(res => {
        this.setState({ updateHabit: "" });
      })
      .then(res => {
        axiosWithHeaders()
          .get("http://lifegpadb.herokuapp.com/api/habits/")
          .then(res => {
            this.props.getHabits()
          })
          this.setState({ editHappening: false})
      });
  };


  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  edit = (habit, id) => {
    this.setState({
      updateHabit: habit,
      editHappening: !this.state.editHappening,
      editId: id
    });
  };


  toggle = (id, i) => {
    console.log('this is working')
    
    // if (this.state.completed === false) {
    //   this.setState({ completed: !this.state.completed })
    // } else {
    //   this.setState({ completed: !this.state.completed })
    // }
    let lastCompletedDate = null;
    
    const today = new Date();
    // console.log(today, '62')
    today.setHours(0,0,0,0) 
    // console.log(today, '64')
    if(this.props.habit.last_completed !== null) {
        const lastCompletedString = this.props.habit.last_completed;
        const lastCompletedArray = lastCompletedString.split('T');
        lastCompletedDate = new Date(lastCompletedArray[0])
        lastCompletedDate.setHours(0, 0, 0, 0)
    } else {
        lastCompletedDate = today - (1000*60*60*24)
        lastCompletedDate.setHours(0, 0, 0, 0)
    }
    
    
    const dateDifference = (today - lastCompletedDate) / 1000 / 60 / 60 / 24
    const incrementCompleted = this.props.habit.count + 1;
    const decrementCompleted = this.props.habit.count - 1;
   

    // console.log(this.props.habit)
    console.log(dateDifference, 'no')

    dateDifference >= 1  ?
      axiosWithHeaders()
        .put(`http://lifegpadb.herokuapp.com/api/habits/${id}`, { count: incrementCompleted, last_completed: today })
        .then(res => {
        //   console.log('first option')
          this.props.getHabits();
        })
        .catch(err => console.log('whatTheLiteralF'))
      :
      console.log('decrementing')
      let todaysday = new Date(today - (1000*60*60*24));
      console.log(todaysday, 'yo')
      axiosWithHeaders()
        .put(`http://lifegpadb.herokuapp.com/api/habits/${id}`, { count: decrementCompleted, last_completed: todaysday })
        .then(res => this.props.getHabits())
        .catch(err => console.log('error'))
    }



  render() {
    return (
      <div key={this.props.habit.id} className="habitsList">
        <button
          onClick={e => this.props.handleDelete(e, this.props.habit.id)}
          className="manipulateButtons"
        >
          ❌
        </button>

        <button
          onClick={() => {
            this.edit(this.props.habit.habit, this.props.habit.id);
          }}
        >
          edit
        </button>

        <p className="madeHabit" id={this.state.completed ? 'completed' : null}>{this.props.habit.habit}</p>

        <button
          onClick={e => this.toggle(this.props.habit.id, this.props.index)}
        >
          Daily Habit Completed
        </button>

        {/* <p className="calculatedData">
          {(this.props.habit.count /
            (Date.now() - this.props.habit.created_at)) *
            100}
          %
        </p> */}

        {this.state.editId === this.props.habit.id &&
        this.state.editHappening ? (
          <form
            onSubmit={e => {
              this.submitUpdate(e, this.props.habit.id);
            }}
          >
            <input
              type="text"
              name="updateHabit"
              onChange={this.handleChange}
              value={this.state.updateHabit}
            />
          </form>
        ) : null}
      </div>
    );
  }
}

export default Habit;