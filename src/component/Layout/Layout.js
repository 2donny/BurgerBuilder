import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import './Layout.css';

function Layout(props) {
    return (
        <div className="Container">
            <Toolbar />
            {props.children}
        </div>
    )
}

export default Layout;