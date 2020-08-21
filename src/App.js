import React from 'react';
import Layout from './component/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <Layout>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/" exact component={BurgerBuilder}/>
        </Layout>
      </div>
  )
}

export default App;
