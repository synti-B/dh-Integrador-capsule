import React, { Component } from 'react';
import CardsProducts from './CardsProducts';

class Products extends Component {

  constructor(props) {
    super(props)
    this.state = {
      productsList: []
    }
  }

  componentDidMount() {

    fetch('/api/products')
      .then(respuesta => {
        return respuesta.json()
      })
      .then(products => {
        this.setState({ productsList: products.data })
      })
      .catch(error => console.log(error))
  }
  render() {
    return (
      <div className='carrusel'> 
        {
          this.state.productsList.map((product, index) => {
            return ( 
              <CardsProducts key={index} product={product}/>
            )
          })
        }
      </div>
    );
  }

}
export default Products;