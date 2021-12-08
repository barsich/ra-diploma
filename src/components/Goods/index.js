import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, fetchMoreItems } from '../../actions/actionCreators';
import { changeCategory } from '../../reducers/categoriesSlice';
import { changeSearchValue } from '../../reducers/itemListSlice';
import CategoriesSelector from '../CategoriesSelector';
import GoodsItem from './GoodsItem.js';

// FIXME на запрос "белый" не загружается 7й товар
// FIXME после поиска в хедере первая смена категории некорректна
export default function Goods({ query, page }) {
  const { items, lastFetchedItems, status, storedSearchValue } = useSelector(
    (state) => state.itemListReducer
  );
  const { active } = useSelector((state) => state.categoriesListReducer);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (storedSearchValue) {
      setSearchValue(storedSearchValue);
    } else if (query) {
      setSearchValue(query);
    }
  }, [storedSearchValue, query]);

  // если поиск был из строки в хедере:
  useEffect(() => {
    dispatch(fetchItems({ id: 0, query }));
  }, [dispatch, query]);

  // FIXME очистка сохраненного поиска при размонтировании
  useEffect(() => {
    if (!query) {
      return () => dispatch(changeSearchValue(''));
    }
  }, []);

  useEffect(() => {
    return () => dispatch(changeCategory(0));
  }, []);

  // TODO загрузка/ошибка
  const handleLoadMore = () => {
    dispatch(fetchMoreItems({ id: active, offset: items.length + 1, query: searchValue }));
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(changeSearchValue(searchValue));
    dispatch(fetchItems({ id: active, query: searchValue }));
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      <CategoriesSelector />

      {page ? null : (
        <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
          <input
            className="form-control"
            placeholder="Поиск"
            value={searchValue}
            onChange={handleChange}
          />
        </form>
      )}

      <div className="row">
        {items.map((item) => (
          <GoodsItem item={item} key={item.id} />
        ))}
      </div>
      <div className="text-center">
        {items.length >= 6 && lastFetchedItems.length >= 6 && (
          <button className="btn btn-outline-primary" onClick={handleLoadMore}>
            Загрузить ещё
          </button>
        )}
      </div>
    </section>
  );
}
