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
    console.log(this.state.completed)
    if (this.state.completed === false) {
      this.setState({ completed: true })
    } else {
      this.setState({ completed: false })
    }
    console.log(this.state.completed)

    const incrementCompleted = this.props.habit.count + 1
    const decrementCompleted = this.props.habit.count - 1

    this.state.completed  ?
      axiosWithHeaders()
        .put(`http://lifegpadb.herokuapp.com/api/habits/${id}`, { count: incrementCompleted })
        .then(res => {
          console.log('first option')
          this.props.getHabits();
        })
        .catch(err => console.log('whatTheLiteralF'))
      :
      axiosWithHeaders()
        .put(`http://lifegpadb.herokuapp.com/api/habits/${id}`, { count: decrementCompleted })
        .then(
          axiosWithHeaders()
            .get("http://lifegpadb.herokuapp.com/api/habits/")
            .then(res => {
              console.log('second option')
              this.setState({
                habits: res.data
              });
            })
            .catch(err => console.log("Data Failed", err.response))
        )
        .catch(err => console.log('sh%t'))
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