import React from 'react';
import './Input.css';

function Input(props) {
    let inputElement = null;
    let invalidClass = null;

    if(props.inValid && props.shouldValidate && props.touched) { // invalid일 시 Invalid 클래스 추가
        invalidClass = 'Invalid';
    }
    let errorMessages = null;
    if(props.inValid && props.shouldValidate && props.touched) {
        errorMessages = <p className="errorMessage">Please enter a valid {props.type}</p>
    }
    switch(props.elementType) {
        case 'input':
            inputElement = <input className={"InputElement " + invalidClass} 
                                    {...props.elementConfig} 
                                    value={props.value} 
                                    onChange={props.changed}
                                    />
            break;
        case 'textarea':
            inputElement = <textarea className={"InputElement " + invalidClass} 
                                        {...props.elementConfig} 
                                        value={props.value} 
                                        onChange={props.changed}
                                        />
            break;
        case 'select':
            inputElement = (
                <select className={"InputElement " + invalidClass} 
                        value={props.value} 
                        onChange={props.changed}
                        >
                    {props.elementConfig.option.map((opt, index) => (
                        <option key={index} value={opt.value}>{opt.displayValue}</option>
                    ))}
                </select>
            )
            break;
        default:
            inputElement = <input className={"InputElement " + invalidClass} {...props.elementConfig} value={props.value}/>
    }
    return (
        <div className="Input">
            {inputElement}
            {errorMessages}
        </div>
    )
}

export default Input;
