import React from 'react';

function Layout(props) {
    return (
        <div>
            Toolbar, SideDrawer, Backdrop
            {props.children}
        </div>
    )
}

export default Layout;