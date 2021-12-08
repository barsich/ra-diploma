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
    <Router>
      <Switch>
        <Route path="/ra-diploma/catalog/:id.html" component={ItemPage} />
        <Route path="/ra-diploma/catalog.html" component={CatalogPage} />
        <Route path="/ra-diploma/about.html" component={AboutPage} />
        <Route path="/ra-diploma/cart.html" component={CartPage} />
        <Route path="/ra-diploma/contacts.html" component={ContactsPage} />
        <Route path="/ra-diploma" exact component={HomePage} />
        <Route path="/ra-diploma/404.html" component={NotFoundPage} />
        <Route path="*">
          <Redirect to="/ra-diploma/404.html" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
