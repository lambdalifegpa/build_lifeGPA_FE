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
    let lastCompletedDate = null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.props.habit.last_completed !== null) {
      lastCompletedDate = new Date(this.props.habit.last_completed);
    } else {
      lastCompletedDate = new Date(today - 1000 * 60 * 60 * 24);
      lastCompletedDate.setHours(0, 0, 0, 0);
    }

    const dateDifference = (today - lastCompletedDate) / 1000 / 60 / 60 / 24;

    if (dateDifference >= 1) {
      console.log("INCREMENTING")
      let newCount;
      if (this.props.habit.count == null || this.props.habit.count === 0) {
        newCount = 1
      } else {
        newCount = this.props.count + 1
      }

      axiosWithHeaders()
        .put(`http://lifegpadb.herokuapp.com/api/habits/${id}`, {
          count: newCount,
          last_completed: today
        })
        .then(res => {
          this.props.getHabits();
        })
        .catch(err => console.log("whatTheLiteralF"));

    } else {
      console.log("DECREMENTING")
      const newCount = this.props.habit.count - 1;
      
      const yesterday = new Date(today - 1000 * 60 * 60 * 24);
      yesterday.setHours(0, 0, 0, 0);

      axiosWithHeaders()
        .put(`http://lifegpadb.herokuapp.com/api/habits/${id}`, {
          count: newCount,
          last_completed: yesterday
        })
        .then(res => this.props.getHabits())
        .catch(err => console.log("error"));
    }
  };


  render() {
    return (
      <div key={this.props.habit.id} >
        <div className="habitsList">
          <button
            onClick={e => this.props.handleDelete(e, this.props.habit.id)}
            className="manipulateButtons"
          >
            ❌
          </button>

          <button
            onClick={() => {
              this.edit(this.props.habit.habit, this.props.habit.id);
            }} className='editButton'
          >
            edit
          </button>

          <p className="madeHabit" id={this.state.completed ? 'completed' : null}>{this.props.habit.habit}</p>

          <button
            onClick={e => this.toggle(this.props.habit.id, this.props.index)}
            className='submitButton'
          >
            Daily Habit Completed
          </button>
        </div>
        {/* <p className="calculatedData">
          {(this.props.habit.count /
            (Date.now() - this.props.habit.created_at)) *
            100}
          %
        </p> */}
        <div className='changeHabitInputHolder'>
          {this.state.editId === this.props.habit.id &&
          this.state.editHappening ? (
            <form
              onSubmit={e => {
                this.submitUpdate(e, this.props.habit.id);
              }}
            >
              <input
                className='changeHabitInput'
                type="text"
                name="updateHabit"
                onChange={this.handleChange}
                value={this.state.updateHabit}
              />
              <button className='UHButton'>Update Habit</button>
            </form>
          ) : null}
        </div>  
      </div>
    );
  }
}

export default Habit;