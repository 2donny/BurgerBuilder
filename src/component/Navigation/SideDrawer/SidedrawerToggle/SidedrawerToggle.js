import React from 'react';
import './SidedrawerToggle.css';

function SidedrawerToggle(props) {
    return (
        <div className="SidedrawerToggle" onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default SidedrawerToggle;
