import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchCategories, fetchItems } from '../../actions/actionCreators';
import { changeCategory } from '../../reducers/categoriesSlice';
import CategoriesItem from './CategoriesItem';

export default function CategoriesSelector() {
  const { categories, active } = useSelector((state) => state.categoriesListReducer);
  const { storedSearchValue } = useSelector((state) => state.itemListReducer);
  const dispath = useDispatch();

  useEffect(() => {
    dispath(fetchCategories());
  }, [dispath]);

  const handleSelect = (id) => {
    dispath(changeCategory(id));
    console.log(id, storedSearchValue)
    dispath(fetchItems({ id, query: storedSearchValue }));
  };

  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item" onClick={() => handleSelect(0)}>
        <NavLink to="#" className="nav-link" isActive={() => active === 0}>
          Все
        </NavLink>
      </li>
      {categories.map((category) => (
        <CategoriesItem item={category} key={category.id} active={active} onClick={handleSelect} />
      ))}
    </ul>
  );
}
