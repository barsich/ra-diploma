import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchItems, fetchMoreItems } from '../../actions/actionCreators';
import { changeCategory } from '../../reducers/categoriesSlice';
import { changeSearchValue } from '../../reducers/itemListSlice';
import { getQuery } from '../../utils';
import CategoriesSelector from '../CategoriesSelector';
import Error from '../Error';
import Loading from '../Loading';
import GoodsItem from './GoodsItem.js';

export default function Goods({ query, page }) {
  const { items, lastFetchedItems, statusFetch, statusFetchMore, storedSearchValue } = useSelector(
    (state) => state.itemListReducer
  );
  const { active } = useSelector((state) => state.categoriesListReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (storedSearchValue && page !== '/') {
      let url = `${page}?q=${storedSearchValue}&categoryId=${active}`;
      history.replace(url);
    }
    console.log(`id: ${active}, query: ${storedSearchValue}`);
    dispatch(fetchItems({ id: active, query: storedSearchValue }));
  }, [dispatch, history, page, storedSearchValue, active]);

  useEffect(() => {
    const { decodedQuery, category } = getQuery();
    if (decodedQuery) {
      setSearchValue(decodedQuery);
      dispatch(changeSearchValue(decodedQuery));
    } else {
      setSearchValue(storedSearchValue);
    }
    if (category) {
      dispatch(changeCategory(category));
    }
  }, [dispatch, storedSearchValue, query]);

  // очистка категории и поиска при размонтировании
  useEffect(() => {
    return () => {
      dispatch(changeCategory(0));
      dispatch(changeSearchValue(''));
    };
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchMoreItems({ id: active, offset: items.length, query: searchValue }));
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

      {page.includes('catalog') && (
        <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
          <input
            className="form-control"
            placeholder="Поиск"
            value={searchValue}
            onChange={handleChange}
          />
        </form>
      )}

      {statusFetch === 'loading' ? <Loading /> : null}
      {statusFetch === 'failed' ? <Error /> : null}
      {statusFetch === 'succeeded' && items.length === 0 ? (
        <p className="error-message">Подходящих товаров нет</p>
      ) : null}
      {statusFetch === 'succeeded' && items.length ? (
        <>
          <div className="row">
            {items.map((item) => (
              <GoodsItem item={item} key={item.id} />
            ))}
          </div>
          <div className="text-center">
            {items.length >= 6 && lastFetchedItems.length >= 6 && (
              <button
                className="btn btn-outline-primary btn-load-more"
                onClick={handleLoadMore}
                disabled={statusFetchMore === 'loading'}
              >
                {statusFetchMore === 'idle' || statusFetchMore === 'succeeded'
                  ? 'Загрузить ещё'
                  : null}
                {statusFetchMore === 'loading' ? <Loading /> : null}
                {statusFetchMore === 'failed' ? <Error /> : null}
              </button>
            )}
          </div>
        </>
      ) : null}
    </section>
  );
}
