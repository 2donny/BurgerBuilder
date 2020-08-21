import React from 'react';
import './ContactData.css';

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div className="ContactData">
                <h4>Enter Your Contact Data</h4>
                <form className="form-data">
                    <input type="text" name="name" placeholder="Your name here"/>
                    <input type="email" name="email" placeholder="Your email here"/>
                    <input type="text" name="street" placeholder="Street here"/>
                    <input type="text" name="postalCode" placeholder="PostalCode here"/>
                </form>
            </div>
        )
    }
}

export default ContactData;
