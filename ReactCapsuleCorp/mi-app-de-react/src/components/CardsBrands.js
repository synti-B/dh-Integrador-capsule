import React from "react";

function CardsBrands (props){ 
    return (
    <div className="cards3">
        <img className="imgCat" src={props.brand.image} alt="" />
        <h1>{props.brand.name}</h1>
    </div>
    )}

export default CardsBrands