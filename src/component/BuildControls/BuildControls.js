import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {
        label: 'Meat',
        type: 'Meat',
    },
    {
        label: 'Cheese',
        type: 'Cheese',
    },
    {
        label: 'Salad',
        type: 'Salad',
    },
    {
        label: 'Bacon',
        type: 'Bacon',
    },
]

function BuildControls({isAuth, totalPrice, disabledInfo, addIngredientHandler, removeIngredientHandler, purchasableInfo, ordered}) {
    return (
        <div className="BuildControls">
            <p>Current Price : <strong>{totalPrice.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl 
                key={ctrl.label}
                label={ctrl.label} 
                disabledInfo={disabledInfo[ctrl.type]}
                addIngredientHandler={() => addIngredientHandler(ctrl.type)}
                removeIngredientHandler={() => removeIngredientHandler(ctrl.type)}
                purchasableInfo={purchasableInfo}
                />
            ))}
            <button 
                className="OrderButton" 
                disabled={!purchasableInfo}
                onClick={ordered}
            >{isAuth ? "ORDER NOW" : "Login to order !"}</button>
        </div>
    )
}

export default BuildControls;
