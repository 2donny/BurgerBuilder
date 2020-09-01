import React from 'react';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import './Auth.css';
import { connect } from 'react-redux';
import Spinner from '../../component/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {checkValidity} from '../../Shared/utility';
import * as action from '../../Store/actions/index';


class Auth extends React.Component {
    state = {
        control: {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
        },
        isSignup: false,
        error: "",
    }


    onChangeHandler = (event, inputIdentifier) => {
        const updatedControl = {
            ...this.state.control,
            [inputIdentifier]: {
                ...this.state.control[inputIdentifier],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.control[inputIdentifier].validation),
                touched: true,
            }
        }
        this.setState({control: updatedControl});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.control.email.value, this.state.control.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.control) {
            formElementArray.push({
                id: key,
                config: this.state.control[key]
            })
        }
        let form = formElementArray.map(formElement => (
            <Input key={formElement.id}
                    type={formElement.id} 
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value}
                    touched={formElement.config.touched}
                    inValid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                      changed={(event) => this.onChangeHandler(event, formElement.id)}
            />
        ))

        if(this.props.loading) {
            form = <Spinner />
        }
        
        if(this.props.error) {
            this.props.errorInit();
            alert(this.props.error);
        }
        
        if(this.props.token) {
            if(this.props.ingredients) { //로그인 + 선택했던 재료가 있는 경우
                form = <Redirect to="/checkout"/>
            }else {
                form = <Redirect to="/"/>
            }
        }
        return (
            <div className="Auth">
                <form onSubmit={this.submitHandler}>
                    <h2>Please {this.state.isSignup ? "sign up" : "login"}</h2>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button width='150px' clicked={this.switchAuthModeHandler} btnType="Danger">Switch to {this.state.isSignup ? "Sign in" : "Sign up"}</Button>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        loading: store.auth.loading,
        error: store.auth.error,
        token: store.auth.token,
        ingredients: store.burgerBuilder.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(action.auth(email, password, isSignup)),
        errorInit: () => dispatch(action.errorInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth); 