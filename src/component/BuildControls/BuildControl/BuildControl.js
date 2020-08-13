import React from 'react';
import "./BuildControl.css";

function BuildControl( {label, disabledInfo, addIngredientHandler, removeIngredientHandler} ) {
    console.log(disabledInfo);
    return (
        <div className="BuildControl">
            <div className="label">{label}</div>
            <button onClick={removeIngredientHandler} className="Less" >Less</button>
            <button onClick={addIngredientHandler} className="More" disabled={disabledInfo}>More</button> 
        </div>
    )
}

export default BuildControl;
