import React from 'react';
import './SideDrawer.css';
import Logo from '../../Logo/Logo';
import Navigationitem from '../Navigationitems/Navigationitem/Navigationitem';
import Navigationitems from '../Navigationitems/Navigationitems';

function SideDrawer(props) {
    return (
        <div className={props.show ? "SideDrawer Open" : "SideDrawer Close"}>
            <Logo height="11%"/>
            <div className="drawer--nav">
                <Navigationitems>
                    <Navigationitem active={false}>Burger Builder</Navigationitem>
                    <Navigationitem active={false}>Checkout</Navigationitem>
                </Navigationitems>
            </div>
        </div>
    )
}

export default SideDrawer;
