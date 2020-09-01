import React from 'react';
import './SideDrawer.css';
import Logo from '../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';

function SideDrawer(props) {
    return (
        <div className={props.show ? "SideDrawer Open" : "SideDrawer Close"} onClick={props.closed}>
            <Logo height="11%"/>
            <div className="drawer--nav">
                <Navigationitems isAuth={props.isAuth}/>
            </div>
        </div>
    )
}

export default SideDrawer;
