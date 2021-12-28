import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchSelectedItem } from '../../actions/actionCreators';
import { addToCart } from '../../reducers/cartSlice';
import { clearSelectedItem } from '../../reducers/itemListSlice';
import Error from '../Error';
import Loading from '../Loading';

export default function OpenedItem({ id }) {
  const { selectedItem, statusFetchItem } = useSelector((state) => state.itemListReducer);
  const { images, title, sku, manufacturer, color, material, season, reason, sizes } = selectedItem;
  const [count, setCount] = useState(1);
  const [selectedSize, setSize] = useState(null);
  const [isSizesUnavaliable, setSizesAvailability] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchSelectedItem(id));
  }, [dispatch, id]);

  useEffect(() => {
    setSizesAvailability(
      sizes &&
        sizes.every((size) => {
          return !size.avalible;
        })
    );
  }, [selectedItem, sizes]);

  // сброс выбранного итема при размонтировании
  useEffect(() => {
    return () => dispatch(clearSelectedItem());
  }, [dispatch]);

  const handleIncrease = () => {
    if (count === 10) {
      return;
    }
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      return;
    }
    const itemToAdd = {
      id: selectedItem.id,
      name: selectedItem.title,
      size: selectedSize,
      count,
      price: selectedItem.price,
    };
    dispatch(addToCart(itemToAdd));
    history.push('/cart.html');
  };

  const handleSizeSelect = (size) => {
    setSize(size);
  };

  return (
    <>
      {statusFetchItem === 'loading' ? <Loading /> : null}
      {statusFetchItem === 'failed' ? <Error /> : null}
      {statusFetchItem === 'succeeded' ? (
        <section className="catalog-item">
          <h2 className="text-center">{title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={images && images[0]} className="img-fluid" alt={title} />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{reason}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии:
                  {/* вывод, если размеры есть */}
                  {sizes &&
                    sizes.map((size) =>
                      size.avalible ? (
                        <span
                          className={`catalog-item-size ${
                            selectedSize === size.size ? 'selected' : ''
                          }`}
                          key={size.size}
                          onClick={() => handleSizeSelect(size.size)}
                        >
                          {size.size}
                        </span>
                      ) : null
                    )}
                  {/* вывод, если размеров нет  */}
                  {isSizesUnavaliable ? <span> нет</span> : null}
                </p>
                {!isSizesUnavaliable && (
                  <p>
                    Количество:
                    <span className="btn-group btn-group-sm pl-2">
                      <button className="btn btn-secondary" onClick={handleDecrease}>
                        -
                      </button>
                      <span className="btn btn-outline-primary">{count}</span>
                      <button className="btn btn-secondary" onClick={handleIncrease}>
                        +
                      </button>
                    </span>
                  </p>
                )}
              </div>
              <button
                className="btn btn-danger btn-block btn-lg"
                onClick={handleAddToCart}
                disabled={isSizesUnavaliable}
              >
                В корзину
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
