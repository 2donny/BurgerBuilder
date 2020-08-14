import React from 'react';
import './Button.css';

function Button({children, clicked, btnType}) {
    return (
        <button onClick={clicked} className={['Button', btnType].join(' ')}>
            {children}
        </button>
    )
}

export default Button;
