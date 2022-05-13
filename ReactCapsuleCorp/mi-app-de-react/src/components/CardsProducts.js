import React from "react";

function CardsProducts (props){ 
    return (
    <div className="cards2">
        <img className="imgProd" src={props.product.image}  width="80vw" alt="" />
        <h1>{props.product.name}</h1>
        <div className="price-discount">
        <h1>$ {props.product.price}</h1>
        {props.product.discount > 0 
        ?
        <h1 className="discount">{props.product.discount}%</h1>
        :"" }
        </div>
    </div>
    )}

    export default CardsProducts