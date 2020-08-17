import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';
import SidedrawerToggle from '../SideDrawer/SidedrawerToggle/SidedrawerToggle';

function Toolbar(props) {
    return (
        <header className="Toolbar">
            <SidedrawerToggle clicked={props.MenuClicked}/>
            <Logo height="80%"/>
            <nav className="Toolbar--nav">
                <Navigationitems/>
            </nav>
        </header>
    )
}

export default Toolbar;
