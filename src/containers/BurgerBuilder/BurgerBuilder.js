import React from 'react';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/orderSummary/orderSummary';
import axios from '../../axios-orders';
import Spinner from '../../component/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../Store/action';

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
            purchasing: false,  //Order Now Button Click or not ?
            error: false,
        }
    }
    
    componentDidMount() {
        // axios.get('/data.json')
        //     .then(response => {
        //         this.setState({ingredient: response.data.ingredient, totalPrice: response.data.totalPrice});
        //     })
        //     .catch(() => {this.setState({error: true})});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const ingredients = {
            ...this.props.ingre,
        }
        const UpdatedCheckoutInfo = Object.keys(ingredients).map(ig => { //[Meat, Salad, Cheese, Bacon]
            return ig + '=' + ingredients[ig] //[Meat=1, Salad=2, Cheese=2, Bacon=1]
        });
        UpdatedCheckoutInfo.push('totalPrice=' + this.props.totPrice); //[Meat=1, Salad=2, Cheese=2, Bacon=1, totalPrice=1.4]
        const checkoutParam = UpdatedCheckoutInfo.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: `?${checkoutParam}`,
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
        return sum > 0;
    }

    addIngredientHandler = (type) => {
        this.props.addIngredient(type);
        this.updatePurchaseState(this.props.ingre);
    }

    removeIngredientHandler = (type) => {
        this.props.removeIngredient(type);
        this.updatePurchaseState(this.props.ingre);
    }

    render() {
        const disabledInfo = {
            ...this.props.ingre
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        const { purchasing } = this.state;

        // orderSummary Config
        let orderSummary = null;
        if(this.props.ingre) {
            orderSummary = (
                        <OrderSummary 
                            continueClicked={this.purchaseContinueHandler} 
                            cancleClicked={this.purchaseCancelHandler} 
                            totalPrice={this.props.totPrice}
                            ingredients={this.props.ingre}>
                        </OrderSummary>
            )
            if(this.state.onOrder) {
                orderSummary = <Spinner></Spinner>
            }
        }

        // BurgerBuilder Config
        let burger = this.state.error ? <p style={{textAlign: "center"}}>You can't load ingredients</p> : <Spinner />
        if(this.props.ingre) {
            burger = (
                <>
                    <Burger ingredient={this.props.ingre}/>
                    <BuildControls 
                            totalPrice={this.props.totPrice}
                            disabledInfo={disabledInfo} 
                            addIngredientHandler={(type) => this.addIngredientHandler(type)} 
                            removeIngredientHandler={(type) => this.removeIngredientHandler(type)}
                            purchasableInfo={this.updatePurchaseState(this.props.ingre)}
                            ordered={this.purchaseHandler}
                    />
                </>
            )
        }

        return (
            <>
                {burger}
                <Modal modalClosed={this.purchaseCancelHandler} show={purchasing}>
                    {orderSummary}
                </Modal>
            </>
        )
    } 
}

const mapStateToProps = state => {
    return {
        ingre: state.ingredients,
        totPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (type) => dispatch({type: actionTypes.ADDINGREDIENT, ingredientType: type}),
        removeIngredient: (type) => dispatch({type: actionTypes.REMOVEINGREDIENT, ingredientType: type}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));


