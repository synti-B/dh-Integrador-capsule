import React, { Component } from 'react';
import CardsCat from './CardsCat';

class ProductCat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prodCatList: []
    }
    
  }
  
  componentDidMount() {

    fetch('/api/total')
      .then(respuesta => {
        return respuesta.json()
      })
      .then( prodXCat => {
        this.setState({ prodCatList: prodXCat.productsCategories })
      })
      .catch(error => console.log(error))
  }
  render() {
    
    return (
     
      <div className='carrusel1'> 
      
        {
          this.state.prodCatList.map((prodCat, index) => {
            return ( 
              <CardsCat key={index} prodCat={prodCat}/>
            )
          })
        }
      </div>
     
    );
  }

}
export default ProductCat;