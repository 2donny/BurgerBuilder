import React from 'react';
import {NavLink} from 'react-router-dom';
import "./Navigationitem.css";

function Navigationitem(props) {
    return (
        <li className="Navigationitem">
            <NavLink activeClassName="active" exact to={props.link}>{props.children}</NavLink>
        </li>
    )
}

export default Navigationitem;
