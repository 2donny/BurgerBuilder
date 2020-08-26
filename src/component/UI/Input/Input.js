import React from 'react';
import './Input.css';

function Input(props) {
    let inputElement = null;
    switch(props.inputtype) {
        case 'input':
            inputElement = <input className="InputElement"{...props}/>
            break;
        case 'textarea':
            inputElement = <textarea className="InputElement"{...props}/>
            break;
        default:
            inputElement = <input className="InputElement"{...props}/>
    }
    return (
        <div className="Input">
            {inputElement}
        </div>
    )
}

export default Input;
