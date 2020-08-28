import React from 'react';
import './Button.css';

function Button({children, clicked, btnType, disabled}) {
    return (
        <button onClick={clicked} 
                className={['Button', btnType].join(' ')}
                disabled={disabled}>
            {children}
        </button>
    )
}

export default Button;
