import React from 'react'
import NavBar2 from './navBar2'
import './homePage.css'
import AddHabit from './AddHabit';
import axios from 'axios'
import axiosWithHeaders from '../authentication/axiosWithAuthen'

class HomePage extends React.Component {
  state = {
    habits: [],
    completed: false,
    updateHabit: '',
    editHappening: false,
    editId: null,
    totalGPA: 0
  };

  logOut = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };

  componentDidMount() {
    console.log(this.state.habits)
    axiosWithHeaders()
      .get("http://lifegpadb.herokuapp.com/api/habits/")
      .then(res => {
        this.setState({
          habits: res.data
        });
      })
      .catch(err => console.log("Data Failed", err.response));
  }

  // grossGPA = () => {
  //   const gpa = (this.habits.count / (this.habits.createdAt - this.habits.lastCompleted))*100
  // }

  edit = (habit, id) => {
    this.setState({ 
      updateHabit: habit,
      editHappening: !this.state.editHappening,
      editId: id
    })
  }
    
  submitUpdate = (e, id) => {
    e.preventDefault();
    axiosWithHeaders()
      .put(`http://lifegpadb.herokuapp.com/api/habits/${id}`, { habit: this.state.updateHabit})
      .then( res => {
        this.setState({ updateHabit: '' })
      })
      .then(res => {
        axiosWithHeaders()
          .get("http://lifegpadb.herokuapp.com/api/habits/")
          .then(res => {
            this.setState({
               habits: res.data,
               editHappening: !this.state.editHappening
           });
        })
      .catch(err => console.log("Data Failed", err.response))
      })}
      
      
  
  
     
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getHabits = () => {
    axiosWithHeaders()
      .get("http://lifegpadb.herokuapp.com/api/habits/")
      .then(res => {
        this.setState({
          habits: res.data
        });
      })
      .catch(err => console.log("Data Failed", err.response));
  }

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

  toggle = (id) => {

    this.setState({ completed: !this.state.completed })
    const incrementCompleted = this.state.habits.habit.completedDays  + 1
    const decrementCompleted = this.state.habits.habit.completedDays  - 1 

    this.state.completed ?
    axiosWithHeaders()
      .put(`http://lifegpadb.herokuapp.com/api/habits/${id}`, {completedDays: incrementCompleted})
      .then(
        axiosWithHeaders()
          .get("http://lifegpadb.herokuapp.com/api/habits/")
          .then(res => {
            this.setState({
              habits: res.data
            });
          })
          .catch(err => console.log("Data Failed", err.response))
          )
    :
    axiosWithHeaders()
      .put(`http://lifegpadb.herokuapp.com/api/habits/${id}`, {completedDays: decrementCompleted})
      .then(
        axiosWithHeaders()
          .get("http://lifegpadb.herokuapp.com/api/habits/")
          .then(res => {
            this.setState({
              habits: res.data
            });
          })
          .catch(err => console.log("Data Failed", err.response))
        )
  }

    render() {
    //   if (!localStorage.getItem("token")) {
    //     return <h1>You are not authorized</h1>;
    //   }
      let lifeCount = 0;

      this.state.habits.map(habit => {
        lifeCount += ((habit.count / (Date.now() - habit.createdAt)));
      })

      let lifeGPA =  (lifeCount / this.state.habits.length)*100;

      return (
        <div>
          <NavBar2  logOut={this.logOut}/>
          <div className='top-content'>
            <h1 className='tital'>Life GPA 4.0</h1>

            <h2 className='addPhoto'>{lifeGPA}%</h2>
          </div>

            <div className='bottomContent'>

              <h2 className='habitTital'>My Habits</h2>

              

              {this.state.habits.map(habit => {
                return(
                  <div key={habit.id} className='habitsList'>

                    <button onClick={e => this.handleDelete(e, habit.id)} className='manipulateButtons'>❌</button>

                    <button onClick={() => {this.edit(habit.habit, habit.id)}}>edit</button>

                    <p className='madeHabit'>{habit.habit}</p>

                    <button onClick={e => this.toggle(habit.id)}>Daily Habit Completed</button>

                    <p className='calculatedData'>{(habit.count / (Date.now() - habit.createdAt))*100}%</p>
                    
                    {this.state.editId === habit.id  && this.state.editHappening ?
                    <form onSubmit={e => {this.submitUpdate(e, habit.id)}}>
                      <input
                        type="text"
                        name="updateHabit"
                        onChange={this.handleChange}
                        value={this.state.updateHabit}
                      />
                    </form> : null}

                    </div>
                )})}
              </div>
                <AddHabit getHabits={this.getHabits} />
              
        </div>
      );
    }
}
  
export default HomePage;
  