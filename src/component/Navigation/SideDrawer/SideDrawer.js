import React from 'react';
import './SideDrawer.css';
import Logo from '../../Logo/Logo';
import Navigationitem from '../Navigationitems/Navigationitem/Navigationitem';
import Navigationitems from '../Navigationitems/Navigationitems';

function SideDrawer() {
    return (
        <div className="SideDrawer">
            <Logo height="11%"/>
            <Navigationitems>
                <Navigationitem active={false}>Burger Builder</Navigationitem>
                <Navigationitem active={false}>Checkout</Navigationitem>
            </Navigationitems>
        </div>
    )
}

export default SideDrawer;
