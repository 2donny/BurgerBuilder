import React from 'react';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../component/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: {
                Meat: 0,
                Salad: 0,
                Bacon: 0,
                Cheese: 0
            }
        }
    }
  
    componentDidMount() {
        console.log('mount');
        // console.log(this.props); // => Bacon=1&Cheese=0&Meat=2&Salad=0
        const params = new URLSearchParams(this.props.location.search);
        let receivedIngredient = {
            ...this.state.ingredients
        }
        for(let query of params.entries()) {
            receivedIngredient[query[0]] = +query[1];
        }
        this.setState({ingredients: receivedIngredient});
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
                    ingredient={this.state.ingredients}
                    checkoutCancled={this.checkoutCancelHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                />
                <Route path={this.props.match.url + "/contact-data"} component={ContactData}/>
            </div>
        )
    }
}

export default Checkout;
