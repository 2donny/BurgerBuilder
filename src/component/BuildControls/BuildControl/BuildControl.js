import React from 'react';
import "./BuildControl.css";

function BuildControl( {label, disabledInfo, addIngredientHandler, removeIngredientHandler} ) {
    return (
        <div className="BuildControl">
            <div className="label">{label}</div>
            <button onClick={removeIngredientHandler} className="Less" disabled={disabledInfo}>Less</button>
            <button onClick={addIngredientHandler} className="More">More</button> 
        </div>
    )
}

export default BuildControl;
