import React from 'react';
import "./Order.css";

function Order(props) {
    console.log(props.ingredient);

    const ingredient = [];
    for(let ingredientName in props.ingredient) {
        ingredient.push(
        {
            name: ingredientName,
            amount: props.ingredient[ingredientName]
        }) // [{name: "Meat", amount: 0}, {name:"Salad", amount: 1}]
    }
    const ingredientOutput = ingredient.map(ig => (
        <span 
            key={ig.name}
            style={{textTransform:'capitalize',
                    display:'inline-block',
                    margin:"0 6px",
                    border: "1px solid #ccc",
                    padding: "5px"}}
            >
                {ig.name}({ig.amount}) </span>
    ))

    return (
        <div className="Order">
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price :<strong>USD {props.totalPrice.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;
