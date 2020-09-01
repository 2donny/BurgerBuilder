import React from 'react';
import Layout from './component/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Logout/Logout';
import {connect} from 'react-redux';
import * as action from './Store/actions/index';

class App extends React.Component {

  componentDidMount() {
    this.props.trytoAuthLogin(); //새로고침 해도 로그인 될 수 있게 함. 비동기 액션을 디스패칭
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/Auth" component={Auth}/>
        <Route path="/" component={BurgerBuilder}/>
      </Switch>
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/Logout" component={Logout}/>
          <Route path="/" component={BurgerBuilder}/>
        </Switch>
      );
    }
    
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    isAuthenticated: store.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      trytoAuthLogin: () => dispatch(action.authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
