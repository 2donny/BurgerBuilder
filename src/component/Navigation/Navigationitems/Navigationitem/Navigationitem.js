import React from 'react';
import "./Navigationitem.css";

function Navigationitem(props) {
    const {link, active, children} = props;
    return (
        <li className="Navigationitem">
            <a className={active ? 'active' : null} href='/'>{children}</a>
        </li>
    )
}

export default Navigationitem;
