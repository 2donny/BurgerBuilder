import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../component/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '../../component/UI/Spinner/Spinner';

class Checkout extends React.Component {
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }
    
    render() {
        console.log(this.props);
        return (
            <>
                {this.props.ingre ? (
                    <div className="Checkout">
                        <CheckoutSummary 
                        ingredient={this.props.ingre} // redux 적용
                        checkoutCancled={this.checkoutCancelHandler}
                        checkoutContinue={this.checkoutContinueHandler}
                        />
                        <Route 
                            path={this.props.match.url + "/contact-data"} 
                            component={ContactData}
                            />
                    </div>
                ) : ( //새로 고침시 Spinner 보여주고 '/'로 보내기. 왜? 새로고침하면 React가 죽어서 state가 null이 되니까
                    <>
                        <Spinner />
                        {this.props.history.replace('/')}
                    </>
                )}
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
export default connect(mapStateToProps, null)(Checkout);
