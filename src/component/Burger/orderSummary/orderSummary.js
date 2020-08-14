import React from 'react';
import Button from '../../UI/Button/Button';

function orderSummary( {cancleClicked, continueClicked, ingredients, totalPrice} ) {
    const ingredientSummary = Object.keys(ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    {igKey} : {ingredients[igKey]}
                </li>
            )
        })
    return (
        <div>
            <h3>Your Order</h3>
            <p>A delicious burger wihe the following ingredients : </p>
            <ul>
                {ingredientSummary}
            </ul>
            <strong>Total Price : {totalPrice}</strong>
            <p>Continue to check out?</p>
            <Button clicked={cancleClicked} btnType="Danger">Cancel</Button>
            <Button clicked={continueClicked} btnType="Success">Continue</Button>
        </div>
    )
}

export default orderSummary; 