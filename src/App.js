import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CatalogPage from './pages/CatalogPage';
import ContactsPage from './pages/ContactsPage';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router basename='/ra-diploma'>
      <Switch>
        <Route path="/catalog/:id.html" component={ItemPage} />
        <Route path="/catalog.html" component={CatalogPage} />
        <Route path="/about.html" component={AboutPage} />
        <Route path="/cart.html" component={CartPage} />
        <Route path="/contacts.html" component={ContactsPage} />
        <Route path="/" exact component={HomePage} />
        <Route path="/404.html" component={NotFoundPage} />
        <Route path="*">
          <Redirect to="/404.html" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
