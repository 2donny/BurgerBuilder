import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../component/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '../../component/UI/Spinner/Spinner';
import * as orderAction from '../../Store/actions/index';

class Checkout extends React.Component {
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }
    
    // componentWillMount() {
    //     // this.props.purchaseInit(); //이게 전부 실행되서, purchased가 false가 되기 전에.
    //     // console.log('componentWillMount : ', this.props.purchased); //여기서 purchased는 true이고, true인 상태에서 render()로 가니까, Redirect된다. 그래서 여기서 말고 Checkout 페이지로 못가는거임. 그러므로 BurgerBuilder 페이지에서 Continue 버튼을 누를때 purchasedInit을 미리해주자. 
    // }
    render() {
        const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null;
        return (
            <>
                {this.props.ingre ? (
                    <div className="Checkout">
                        {purchasedRedirect}
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
        ingre: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
