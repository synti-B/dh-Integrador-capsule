import React, { Component } from 'react';
import CardsBrands from './CardsBrands';


class ListsBrands extends Component {
  constructor(props) {
    super(props)
    this.state = {
      brandsList: []
    }
  }
  componentDidMount() {
    fetch('/api/brands')
      .then(respuesta => {
        return respuesta.json()
      })
      .then( brands => {
        this.setState({ brandsList: brands.data })
      })
      .catch(error => console.log(error))
  }
  render() {
    return (
      <div className='carrusel2'> 
        {
          this.state.brandsList.map(( brand, index) => {
            return (                     
              <CardsBrands key={index} brand={brand}/>
            )
          })
        }
      </div>
    );
  }
}

export default ListsBrands;