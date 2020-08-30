import React from 'react';
import './ContactData.css';
import Button from '../../../component/UI/Button/Button';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';
import {connect} from 'react-redux';
import * as action from '../../../Store/actions/index';

class ContactData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false 
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            ZipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    option: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value: 'fastest',
                valid: true
            },
        },
        formIsValid: false,
        ingredient: null,
        totalPrice: null,
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = { // 서버에 보낼 order 만들기.
            ingredient: this.props.ingre,
            totalPrice: this.props.totPrice,
            orderForm: formData,
        }
        this.props.purchaseBurger(order, this.props.token);
    }

    checkValidity = (value, rules) => {
        let isValid = false;

        if(!rules) {
            return false;
        }
        if(rules.required) {
            isValid = value.trim() !== '';
        }

        if(rules.minLength) {
            isValid = (value.length >= rules.minLength);
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    onChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedInput = { // Immutable하게 copy함.
            ...updatedOrderForm[inputIdentifier],
        };
        updatedInput.value = event.target.value;
        updatedInput.valid = this.checkValidity(updatedInput.value, updatedOrderForm[inputIdentifier].validation);
        updatedInput.touched = true;
        updatedOrderForm[inputIdentifier] = updatedInput;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = (updatedOrderForm[inputIdentifier].valid && formIsValid);
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementArrays = [];
        for(let key in this.state.orderForm) {
            formElementArrays.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        return (
            <>
                {this.props.loading ? <Spinner /> : 
                    ( 
                        <div className="ContactData">
                            <h4>Enter Your Contact Data</h4>
                            <form onSubmit={this.orderHandler}>
                                {formElementArrays.map(el => (
                                    <Input key={el.id}
                                            type={el.id} 
                                            elementType={el.config.elementType} 
                                            elementConfig={el.config.elementConfig} 
                                            value={el.config.value}
                                            touched={el.config.touched}
                                            inValid={!el.config.valid}
                                            shouldValidate={el.config.validation}
                                            changed={(event) => this.onChangeHandler(event, el.id)}
                                    />
                                ))}
                                <Button disabled={!this.state.formIsValid} btnType="Success">Order</Button>
                            </form>
                        </div>
                    )
                }
                
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingre: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        purchaseBurger: (orderData, token) => dispatch(action.purchaseBurger(orderData, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
