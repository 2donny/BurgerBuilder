import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

function BuildControls() {

    return (
        <div className="BuildControls">
            <BuildControl label="Meet"/>
            <BuildControl label="Cheese"/>
            <BuildControl label="Salad"/>
            <BuildControl label="Bacon"/>
        </div>
    )
}

export default BuildControls;
