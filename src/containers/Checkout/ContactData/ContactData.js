import React from 'react';
import './ContactData.css';
import Button from '../../../component/UI/Button/Button';
import Spinner from '../../../component/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../component/UI/Input/Input';

class ContactData extends React.Component {
    state = {
        ingredient: null,
        orderForm: {
            customer: {
                name: '',
                email: '',
                address: {
                    street: '',
                    postalCode: '',
                    country: ''
                }
            },
            deliveryMethod: 'fastest'
        },
        totalPrice: null,
        onOrder: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({onOrder: true});
        const order = { // 서버에 보낼 order 만들기.
            ingredient: this.props.ingredient,
            ...this.state.userInfo,
            totalPrice: this.props.totalPrice
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({onOrder: false})
                this.props.history.push('/');
            })
            .catch(() => {
                this.setState({onOrder: false})
            });
    }

    render() {
        return (
            <>
                {this.state.onOrder ? <Spinner /> 
                : ( 
                    <div className="ContactData">
                        <h4>Enter Your Contact Data</h4>
                        <form>
                            <Input inputtype="input" type="text" name="name" placeholder="Your name here" onChange={(event) => {this.setState({name: event.target.value})}}/>
                            <Input inputtype="input" type="email" name="email" placeholder="Your email here" onChange={(event) => {this.setState({email: event.target.value})}}/>
                            <Input inputtype="input" type="text" name="street" placeholder="Street here" onChange={(event) => {this.setState({street: event.target.value})}}/>
                            <Input inputtype="input" type="text" name="postalCode" placeholder="PostalCode here" onChange={(event) => {this.setState({postalCode: event.target.value})}}/>
                            <Button clicked={this.orderHandler} btnType="Success">Order</Button>
                        </form>
                    </div>
                  )
                }
                
            </>
        )
    }
}

export default ContactData;
