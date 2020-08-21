import React from 'react';
import Layout from './component/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import ContactData from './containers/Checkout/ContactData/ContactData';

function App() {
  return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/checkout/contact-data" component={ContactData}/>
            <Route path="/" component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
  )
}

export default App;
