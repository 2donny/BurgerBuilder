import React from 'react';
import './Navigationitems.css';
import Navigationitem from './Navigationitem/Navigationitem';

function Navigationitems(props) {
    console.log("isAuth : ", props.isAuth);
    return (
        <ul className="Navigationitems">
            <Navigationitem link="/">Burger Builder</Navigationitem> 
            {props.isAuth ? (<Navigationitem link="/orders">Order</Navigationitem>) 
              : null
            }   
            {!props.isAuth ? 
                <Navigationitem isAuth={props.isAuth} link="/Auth">Authenticate</Navigationitem>
              : <Navigationitem isAuth={props.isAuth} link="/Logout">Log out</Navigationitem> 
            }
        </ul>
    )
}

export default Navigationitems;
