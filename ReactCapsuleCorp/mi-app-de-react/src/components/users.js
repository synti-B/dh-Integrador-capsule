import React, { Component } from 'react';
import CardsUsers from './CardsUsers';

class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {
      usersList: []
    }
  }

  componentDidMount() {

    fetch('/api/users')
      .then(respuesta => {
        return respuesta.json()
      })
      .then(users => {
        this.setState({ usersList: users.data })
      })
      .catch(error => console.log(error))
  }
  render() {
    return (
      <div className='carrusel4'> 
        {
          this.state.usersList.map((user, index) => {
            return ( 
              <CardsUsers key={index} user={user}/>
            )
          })
        }
      </div>
    );
  }

}
export default Users;