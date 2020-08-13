import React from 'react';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
    meat: 1500,
    cheese: 700,
    salad: 500,
    Bacon: 1000
}

class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: {
                Meat: 0,
                Cheese: 0,
                Salad: 0,
                Bacon: 0
            },
            totalPrice: 4000
        }
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        let updatedCount = 4;
        if(oldCount < 4)
            updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredient
        };
        updatedIngredients[type] = updatedCount;

        const oldTotalPrice = this.state.totalPrice;
        const updatedTotalPrice = oldTotalPrice + INGREDIENTS_PRICE[type];

        this.setState( {ingredient: updatedIngredients, totalPrice: updatedTotalPrice} );
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        let updatedCount = 0;
        if(oldCount > 0)
            updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredient
        };
        updatedIngredients[type] = updatedCount;

        const oldTotalPrice = this.state.totalPrice;
        const updatedTotalPrice = oldTotalPrice - INGREDIENTS_PRICE[type];

        this.setState( {ingredient: updatedIngredients, totalPrice: updatedTotalPrice} );
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredient
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] >= 4;
        }

        return (
            <>
                <Burger ingredient={this.state.ingredient}/>
                <BuildControls disabledInfo={disabledInfo} addIngredientHandler={this.addIngredientHandler} removeIngredientHandler={this.removeIngredientHandler}/>
            </>
        )
    } 
}

export default BurgerBuilder;
