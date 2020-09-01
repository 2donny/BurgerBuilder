import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Backdrop from '../UI/Backdrop/Backdrop';
import {connect} from 'react-redux';

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
    SideDrawerCloseHandler = () => {
        this.setState( {MenuClicking: false});
    }

    render() {
        return (
            <div className="Container">
                <Backdrop show={this.state.MenuClicking} clicked={this.Backdropclicked}/>
                <SideDrawer isAuth={this.props.isAuthenticated} show={this.state.MenuClicking} closed={this.SideDrawerCloseHandler}/>
                <Toolbar isAuth={this.props.isAuthenticated} MenuClicked={this.MenuClicked}/>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        isAuthenticated: store.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);