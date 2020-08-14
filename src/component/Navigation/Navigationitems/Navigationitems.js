import React from 'react';
import './Navigationitems.css';
import Navigationitem from './Navigationitem/Navigationitem';

function Navigationitems(props) {
    return (
        <nav>
            <ul className="Navigationitems">
                <Navigationitem link="/" active/>
                <Navigationitem link="/"/>
            </ul>
        </nav>
    )
}

export default Navigationitems;
