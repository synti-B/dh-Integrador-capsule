import React from "react";

function CardsUsers (props){ 
    return (
    <div className="cards4">
        <h1>Último usuario creado</h1>
        <br/>
        <h2>Fecha: {props.user.createdAt}</h2>
        <h2>Nombre: {props.user.first_name}</h2>
        <h2>Apellido: {props.user.last_name}</h2>
        <h2>E-mail: {props.user.email}</h2>
        <h2>Dirección: {props.user.adress}</h2>
    </div>
    )}

    export default CardsUsers;