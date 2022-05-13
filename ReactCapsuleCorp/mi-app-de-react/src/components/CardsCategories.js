import React from "react";

function CardsCategories (props){ 
    return (
    <div className="cards3">
        <img className="imgCat" src={props.category.image}   alt="" />
        <h1>{props.category.name}</h1>
    </div>
    )}

export default CardsCategories