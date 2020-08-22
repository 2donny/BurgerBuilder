import React from 'react';
import './ContactData.css';
import Button from '../../../component/UI/Button/Button';
import Axios from 'axios';

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = () => {
        const userInfo = {
            ...this.state
        };
        Axios.post('/contact-data', userInfo)
            .then((response) => {
                console.log(response);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="ContactData">
                <h4>Enter Your Contact Data</h4>
                <form className="form-data">
                    <input type="text" name="name" placeholder="Your name here" onChange={(event) => {this.setState({name: event.target.value})}}/>
                    <input type="email" name="email" placeholder="Your email here" onChange={(event) => {this.setState({email: event.target.value})}}/>
                    <input type="text" name="street" placeholder="Street here" onChange={(event) => {this.setState({street: event.target.value})}}/>
                    <input type="text" name="postalCode" placeholder="PostalCode here" onChange={(event) => {this.setState({postalCode: event.target.value})}}/>
                    <Button clicked={this.orderHandler} btnType="Success">Order</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;
