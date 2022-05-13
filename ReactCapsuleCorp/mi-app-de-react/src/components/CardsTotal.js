import React from "react";

function CardsTotal (props){ 
    return (
    <div className="cards">
        <h1>{props.total.name}</h1>
        <h1>{props.total.total}</h1>
    </div>
    )}

    export default CardsTotal