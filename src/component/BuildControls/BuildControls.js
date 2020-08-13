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

function BuildControls({disabledInfo, addIngredientHandler, removeIngredientHandler}) {
    console.log(disabledInfo);
    return (
        <div className="BuildControls">
            {controls.map(ctrl => (
                <BuildControl 
                key={ctrl.label}
                label={ctrl.label} 
                disabledInfo={disabledInfo[ctrl.type]}
                addIngredientHandler={() => addIngredientHandler(ctrl.type)}
                removeIngredientHandler={() => removeIngredientHandler(ctrl.type)}
                />
            ))}
        </div>
    )
}

export default BuildControls;
