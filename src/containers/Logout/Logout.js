import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../../Store/actions/index'; 


class Logout extends React.Component {
    
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (
            <Redirect to="/"/>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(action.logout()),
    }
}

export default connect(null, mapDispatchToProps)(Logout);