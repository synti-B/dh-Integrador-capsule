import React from "react";

function CardsCat (props){ 
    return (
    <div className="cards1">
        <h1>{props.prodCat.name}</h1>
        <h1>{props.prodCat.cantidad}</h1>
     
    </div>
    )}

    export default CardsCat