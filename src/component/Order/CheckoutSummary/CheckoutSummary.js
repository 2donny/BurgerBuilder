import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

function CheckoutSummary(props) {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it tastes well!</h1>
            <div>
                <Burger ingredient={props.ingredient}/>
            </div>
            <Button clicked={props.checkoutCancled} btnType="Danger">Cancle</Button>
            <Button clicked={props.checkoutContinue} btnType="Success"> Continue</Button>
        </div>
    )
}

export default CheckoutSummary;
