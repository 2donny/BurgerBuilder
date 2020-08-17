import React from 'react';
import './Spinner.css';

function Spinner(props) {
    return (
        <div className="loader">
            {props.children}
        </div>
    )
}

export default Spinner;
