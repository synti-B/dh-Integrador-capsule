import React, { Component } from 'react';
import CardsCategories from './CardsCategories';


class ListsCategories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoriesList: []
    }
  }
  componentDidMount() {
    fetch('/api/categories')
      .then(respuesta => {
        return respuesta.json()
      })
      .then( categories => {
        this.setState({ categoriesList: categories.data })
      })
      .catch(error => console.log(error))
  }
  render() {
    return (
      <div className='carrusel2'> 
        {
          this.state.categoriesList.map(( category, index) => {
            return (                     
              <CardsCategories key={index} category={category}/>
            )
          })
        }
      </div>
    );
  }
}

export default ListsCategories;