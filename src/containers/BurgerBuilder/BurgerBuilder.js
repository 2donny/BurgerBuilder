import React from 'react';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/BuildControls/BuildControls';

class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: {
                Meat: 0,
                Cheese: 0,
                Salad: 0,
                Bacon: 0
            }
        }
    }

    render() {
        return (
            <>
                <Burger ingredient={this.state.ingredient}/>
                <BuildControls />
            </>
        )
    } 
}

export default BurgerBuilder;
