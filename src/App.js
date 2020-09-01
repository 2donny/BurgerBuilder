import React, {Suspense} from 'react';
import Layout from './component/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch} from 'react-router-dom';
import Logout from './containers/Logout/Logout';
import {connect} from 'react-redux';
import * as action from './Store/actions/index';


const asyncAuth = React.lazy(() => import('./containers/Auth/Auth'));
const asyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));
const asyncOrders = React.lazy(() => import('./containers/Orders/Orders'));

class App extends React.Component {

  componentDidMount() {
    this.props.trytoAuthLogin(); //새로고침 해도 로그인 될 수 있게 함. 비동기 액션을 디스패칭
  }

  render() {

    let routes = (
      <Suspense fallback={<p> Loading...</p>}>
        <Switch>
            <Route path="/Auth" component={asyncAuth}/>
            <Route path="/" component={BurgerBuilder}/>
        </Switch>
      </Suspense>
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Suspense fallback={<p> Loading...</p>}>
          <Switch>
              <Route path="/checkout" component={asyncCheckout}/>
              <Route path="/orders" component={asyncOrders}/>
              <Route path="/Logout" component={Logout}/>
              <Route path="/" component={BurgerBuilder}/>
          </Switch>
        </Suspense>
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
