import React from 'react';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/orderSummary/orderSummary';
import axios from '../../axios-orders';
import Spinner from '../../component/UI/Spinner/Spinner';

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
            purchasing: false,  //Order Now Button Click or not ?
            onOrder: false
        }
    }
    
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({onOrder: true});
        const order = {
            ingredients: this.state.ingredient,
            price: this.state.totalPrice,
            customer: {
                name: 'Jung E Eon',
                address: {
                    country: 'Korea',
                    home: 'Sejong',
                    zipcode: 4431
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({onOrder: false, purchasing: false})
            })
            .catch(() => {
                this.setState({onOrder: false, purchasing: false})
                alert("There is an Error!");
            });
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
        let orderSummary = (
                    <OrderSummary 
                        continueClicked={this.purchaseContinueHandler} 
                        cancleClicked={this.purchaseCancelHandler} 
                        totalPrice={totalPrice}
                        ingredients={ingredient}>
                    </OrderSummary>
        )
        if(this.state.onOrder) {
            orderSummary = <Spinner> Loading ... </Spinner>
        }
        return (
            <>
                <Burger ingredient={ingredient}/>
                <Modal modalClosed={this.purchaseCancelHandler} show={purchasing}>
                    {orderSummary}
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


