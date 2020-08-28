import React from 'react';
import Order from '../../component/Order/Order/Order';
import axios from'../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';


class Orders extends React.Component {
    state = {
        isLoading: false,
        orders: []
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                console.log(res.data);
                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        id: key,
                        ...res.data[key]
                    })
                }
                this.setState({isLoading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({isLoading: false})
            });
    }

    render() {
        return (
            <div className="Orders">
                {this.state.orders.map(order => (
                    <Order key={order.id} ingredient={order.ingredient} totalPrice={+order.totalPrice}/>
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);
