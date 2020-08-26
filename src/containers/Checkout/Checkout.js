import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../component/Order/CheckoutSummary/CheckoutSummary';
import * as actionTypes from '../../Store/action';

class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // ingredients: null, //ComponentWillMount에 의해 항상, BurgerBuilder에서 넘어온 ingredient가 여기에 저장되어있음.
            // totalPrice: 0, // BurgerBuilder로부터 온 값이 적재되있음.
            onOrder: false,
        }
    }
  
    componentWillMount() {
        //console.log(this.props.location.search) => ?Bacon=1&Cheese=0&Meat=2&Salad=0&totalPrice=1.2
        const params = new URLSearchParams(this.props.location.search);
        let receivedIngredient = {
            ...this.props.ingre
        }
        let receivedTotalPrice = null;
        for(let query of params.entries()) {
            if(query[0] === "totalPrice") {
                receivedTotalPrice = +query[1];
                continue;
            }
            receivedIngredient[query[0]] = +query[1]; //query Param으로 받은 데이터들을 receivedInfo에 저장.
        }
        // this.setState({ ingredients: receivedIngredient,
        //                 totalPrice: receivedTotalPrice });
        if(receivedIngredient && receivedTotalPrice) {
            this.props.receiveBurgerInfo(receivedIngredient, receivedTotalPrice)
        }
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        return (
            <div className="Checkout">
                <CheckoutSummary 
                    ingredient={this.props.ingre} // redux 적용
                    checkoutCancled={this.checkoutCancelHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                />
                <Route 
                    path={this.props.match.url + "/contact-data"} 
                    render={() => (
                        <ContactData ingredient={this.props.ingre} // redux 적용
                                        totalPrice={this.props.totPrice}
                                        {...this.props}/>)}/>
            </div>
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
        receiveBurgerInfo:(ingre, price) => dispatch({type: actionTypes.BURGER_INFO, burger: {ingre, price}}) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
