import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopItems } from '../../actions/actionCreators.js';
import GoodsItem from '../Goods/GoodsItem.js';

export default function HotGoods() {
  const { items, status } = useSelector((state) => state.topItemListReducer);
  const dispath = useDispatch();

  useEffect(() => {
    dispath(fetchTopItems());
  }, [dispath]);
  return (
    <>
      {items.length ? (
        <section className="catalog">
          <h2 className="text-center">Хиты продаж</h2>
          <div className="row">
            {items.map((item) => (
              <GoodsItem item={item} key={item.id} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
