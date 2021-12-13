import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchCategories } from '../../actions/actionCreators';
import { changeCategory } from '../../reducers/categoriesSlice';
import CategoriesItem from './CategoriesItem';

export default function CategoriesSelector() {
  const { categories, active } = useSelector((state) => state.categoriesListReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSelect = (id) => {
    dispatch(changeCategory(id));
  };

  return (
    <>
      {categories.length ? (
        <ul className="catalog-categories nav justify-content-center">
          <li className="nav-item" onClick={() => handleSelect(0)}>
            <NavLink to="#" className="nav-link" isActive={() => active === 0}>
              Все
            </NavLink>
          </li>
          {categories.map((category) => (
            <CategoriesItem
              item={category}
              key={category.id}
              active={active}
              onClick={handleSelect}
            />
          ))}
        </ul>
      ) : null}
    </>
  );
}
