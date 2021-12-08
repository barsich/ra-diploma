import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchSelectedItem } from '../../actions/actionCreators';
import { addToCart } from '../../reducers/cartSlice';

export default function OpenedItem({ id, item }) {
  const { selectedItem } = useSelector((state) => state.itemListReducer);
  // const { images, title, sku, manufacturer, color, material, season, reason, sizes } = item;
  const [count, setCount] = useState(1);
  const [selectedSize, setSize] = useState(null);
  const dispath = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispath(fetchSelectedItem(id));
  }, [dispath, id]);

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

  // FIXME переделать значения пропсов после прикручивания лоадинга
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
    dispath(addToCart(itemToAdd));
    history.push('/ra-diploma/cart.html');
  };

  const handleSizeSelect = (size) => {
    setSize(size);
  };

  // TODO блочить кнопки при отсутствии размеров
  // FIXME переделать при прикручивании ошибок/загрузки
  return (
    <>
      {selectedItem && (
        <section className="catalog-item">
          <h2 className="text-center">{selectedItem.title}</h2>
          <div className="row">
            <div className="col-5">
              <img
                src={selectedItem.images && selectedItem.images[0]}
                className="img-fluid"
                alt={selectedItem.title}
              />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{selectedItem.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{selectedItem.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{selectedItem.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{selectedItem.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{selectedItem.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{selectedItem.reason}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии:
                  {/* FIXME переделать при прикручивании ошибок/загрузки */}
                  {/* вывод, если размеры есть */}
                  {selectedItem.sizes.map((size) =>
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
                  {/* FIXME (не работает) вывод, если размеров нет  */}
                  {/* {selectedItem.sizes.every((size) => !size.avaliable) ? (
                    <span>нет</span>
                  ) : null} */}
                </p>
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
              </div>
              <button className="btn btn-danger btn-block btn-lg" onClick={handleAddToCart}>
                В корзину
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
