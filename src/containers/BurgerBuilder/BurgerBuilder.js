import React from 'react';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/orderSummary/orderSummary';

const INGREDIENTS_PRICE = {
    Meat: 1.5,
    Cheese: 0.6,
    Salad: 0.4,
    Bacon: 1.5
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
            totalPrice: 4,
            purchasable: false, //Order Now 버튼 클릭가능 속성
            purchasing: false  //Order Now Button Click or not ?
        }
    }
    
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('Continue !');
    }


    updatePurchaseState = (updatedIngredients) => { //ORDER NOW 버튼 disalbed 속성 설정해주는 함수
        const sum = Object.keys(updatedIngredients) // [Meat, Cheese, Salad, Bacon]
            .map(ingre => {
                return updatedIngredients[ingre]; // [0, 0, 0, 0]
            })
            .reduce((acc, el) => {
                return acc + el;
            }, 0);
        this.setState({ purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredient
        };
        updatedIngredients[type] = updatedCount;
        const oldTotalPrice = this.state.totalPrice;
        const updatedTotalPrice = oldTotalPrice + INGREDIENTS_PRICE[type];
        this.setState( {ingredient: updatedIngredients, totalPrice: updatedTotalPrice} );
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredient
        };
        updatedIngredients[type] = updatedCount;
        const oldTotalPrice = this.state.totalPrice;
        const updatedTotalPrice = oldTotalPrice - INGREDIENTS_PRICE[type];
        this.setState( {ingredient: updatedIngredients, totalPrice: updatedTotalPrice} );
        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredient
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        const {ingredient, totalPrice, purchasable, purchasing} = this.state;
        return (
            <>
                <Burger ingredient={ingredient}/>
                <Modal modalClosed={this.purchaseCancelHandler} show={purchasing}>
                    <OrderSummary continueClicked={this.purchaseContinueHandler} cancleClicked={this.purchaseCancelHandler} totalPrice={totalPrice}ingredients={ingredient}/>
                </Modal>
                <BuildControls 
                    totalPrice={totalPrice}
                    disabledInfo={disabledInfo} 
                    addIngredientHandler={this.addIngredientHandler} 
                    removeIngredientHandler={this.removeIngredientHandler}
                    purchasableInfo={purchasable}
                    ordered={this.purchaseHandler}
                />
            </>
        )
    } 
}

export default BurgerBuilder;
