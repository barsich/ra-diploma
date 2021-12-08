import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import logo from '../../img/header-logo.png';
import { changeCategory } from '../../reducers/categoriesSlice';
import { changeSearchValue } from '../../reducers/itemListSlice';
import { checkActive } from '../../utils';

export default function Header() {
  // const { storedSearchValue } = useSelector((state) => state.itemListReducer);
  const { items } = useSelector((state) => state.cartItemListReducer);
  const [isSearchVisible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchForm = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearchExpand = () => {
    if (isSearchVisible) {
      if (searchValue.trim() === '') {
        setVisible(false);
      } else {
        searchForm.current.dispatchEvent(new Event('submit', { bubbles: true }));
      }
    } else {
      setVisible(true);
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(changeSearchValue(searchValue));
    dispatch(changeCategory(0));
    history.push({
      pathname: '/ra-diploma/catalog.html',
      search: `?q=${searchValue}`,
      state: { query: searchValue },
    });
    setVisible(false);
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/ra-diploma">
              <img src={logo} alt="Bosa Noga" />
            </NavLink>

            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/ra-diploma" isActive={checkActive}>
                    Главная
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/ra-diploma/catalog.html">
                    Каталог
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/ra-diploma/about.html">
                    О магазине
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/ra-diploma/contacts.html">
                    Контакты
                  </NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                    onClick={handleSearchExpand}
                  ></div>
                  <Link to="/ra-diploma/cart.html">
                    <div className="header-controls-pic header-controls-cart">
                      {items.length !== 0 ? (
                        <div className="header-controls-cart-full">{items.length}</div>
                      ) : null}
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </Link>
                </div>
                {isSearchVisible ? (
                  <form
                    data-id="search-form"
                    className="header-controls-search-form form-inline"
                    ref={searchForm}
                    onSubmit={handleSubmit}
                  >
                    <input
                      className="form-control"
                      placeholder="Поиск"
                      value={searchValue}
                      onChange={handleChange}
                    />
                  </form>
                ) : null}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
