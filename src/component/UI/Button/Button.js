import React from 'react';
import './Button.css';

function Button({children, width, clicked, btnType, disabled}) {
    return (
        <button onClick={clicked} 
                className={['Button', btnType].join(' ')}
                disabled={disabled}
                style={{width: width}}
                >
            {children}
        </button>
    )
}

export default Button;
