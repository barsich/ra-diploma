import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopItems } from '../../actions/actionCreators.js';
import Error from '../Error/index.js';
import GoodsItem from '../Goods/GoodsItem.js';
import Loading from '../Loading/index.js';

export default function HotGoods() {
  const { items, status } = useSelector((state) => state.topItemListReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopItems());
  }, [dispatch]);

  return (
    <>
      {items.length ? (
        <section className="catalog">
          <h2 className="text-center">Хиты продаж</h2>
          {status === 'loading' ? <Loading /> : null}
          {status === 'succeeded' ? (
            <div className="row">
              {items.map((item) => (
                <GoodsItem item={item} key={item.id} />
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {status === 'failed' ? (
        <section className="catalog" style={{ minHeight: 'auto' }}>
          <h2 className="text-center">Хиты продаж</h2>
          <Error />
        </section>
      ) : null}
    </>
  );
}
