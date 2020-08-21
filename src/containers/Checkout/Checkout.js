import React from 'react';
import CheckoutSummary from '../../component/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends React.Component {
    state = {
        ingredients: {
            Meat: '2',
            Salad: '2',
            Bacon: '1',
            Cheese: '1'
        }
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
        console.log(this.props);
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
        console.log(this.props);
    }

    render() {
        return (
            <div className="Checkout">
                <CheckoutSummary 
                    ingredient={this.state.ingredients}
                    checkoutCancled={this.checkoutCancelHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                />
            </div>
        )
    }
}

export default Checkout;
