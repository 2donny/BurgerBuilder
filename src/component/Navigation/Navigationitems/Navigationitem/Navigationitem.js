import React from 'react';
import "./Navigationitem.css";

function Navigationitem(props) {
    const {link, active} = props;
    return (
        <li className="Navigationitem">
            <a className={active ? "active" : null} href={link}>Burger Builder</a>
        </li>
    )
}

export default Navigationitem;
