import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

function Layout(props) {
    return (
        <div className="Container">
            <SideDrawer/>
            <Toolbar />
            {props.children}
        </div>
    )
}

export default Layout;