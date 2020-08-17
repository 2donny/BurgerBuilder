import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Backdrop from '../UI/Backdrop/Backdrop';

const clicked = () => {

}

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            MenuClicking: false,
        }
    }

    MenuClicked = () => {
        this.setState( {MenuClicking: true });
    }

    Backdropclicked = () => {
        this.setState( {MenuClicking: false});
    }

    render() {
        return (
            <div className="Container">
                <Backdrop show={this.state.MenuClicking} clicked={this.Backdropclicked}/>
                <SideDrawer show={this.state.MenuClicking}/>
                <Toolbar MenuClicked={this.MenuClicked}/>
                {this.props.children}
            </div>
        )
    }
}

export default Layout;