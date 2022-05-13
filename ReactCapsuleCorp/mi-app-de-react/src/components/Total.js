import React, { Component } from 'react';
import CardsTotal from './CardsTotal';

class Total extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalList: []
    }
    
  }
  
  componentDidMount() {

    fetch('/api/total')
      .then(respuesta => {
        return respuesta.json()
      })
      .then(total => {
        this.setState({ totalList: total.data })
      })
      .catch(error => console.log(error))
  }
  render() {
    
    return (
     
      <div className='carrusel'> 
      
        {
          this.state.totalList.map((total, index) => {
            return ( 
              <CardsTotal key={index} total={total}/>
            )
          })
        }
      </div>
     
    );
  }

}
export default Total;