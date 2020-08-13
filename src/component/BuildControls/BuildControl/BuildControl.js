import React from 'react';
import "./BuildControl.css";

function BuildControl( {label} ) {
    return (
        <div className="BuildControl">
            <div className="label">{label}</div>
            <button className="Less">Less</button>
            <button className="More">More</button>
        </div>
    )
}

export default BuildControl;
