import React from 'react';
import Order from '../../component/Order/Order/Order';
import axios from'../../axios-orders';
import {connect} from 'react-redux';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import Spinner from '../../component/UI/Spinner/Spinner';
import * as actions from '../../Store/actions/index';


class Orders extends React.Component {
    componentDidMount() {
       this.props.fetchOrder(localStorage.getItem('token'), localStorage.getItem('userId'));
    }

    render() {
        return (
            <>
                {!this.props.loading ? (
                    <div className="Orders">
                        {this.props.orders.map(order => (
                            <Order key={order.id} ingredient={order.ingredient} totalPrice={+order.totalPrice}/>
                        ))}
                    </div> 
                )  :  <Spinner />
                }
            </>
        )
    }
}

const mapStateToProps = store => {
    return {
        orders: store.order.orders,
        loading: store.order.loading,
        token: store.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrder: (token, userId) => dispatch(actions.fetchOrder(token, userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
