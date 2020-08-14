import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';

function Toolbar() {
    return (
        <header className="Toolbar">
            <div>MENU</div>
            <Logo />
            <Navigationitems />
        </header>
    )
}

export default Toolbar;
