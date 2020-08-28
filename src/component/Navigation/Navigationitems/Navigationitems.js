import React from 'react';
import './Navigationitems.css';
import Navigationitem from './Navigationitem/Navigationitem';

function Navigationitems() {
    return (
        <ul className="Navigationitems">
            <Navigationitem link="/">Burger Builder</Navigationitem> 
            <Navigationitem link="/orders">Order</Navigationitem>
        </ul>
    )
}

export default Navigationitems;
