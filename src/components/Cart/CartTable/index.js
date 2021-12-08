import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { removeFromCart } from '../../../reducers/cartSlice';
import { sumPrices } from '../../../utils';
import CartItem from './CartItem';

export default function CartTable() {
  const { items } = useSelector((state) => state.cartItemListReducer);
  const dispatch = useDispatch();

  const handleDelete = (item) => {
    dispatch(removeFromCart(item))
  }

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Размер</th>
          <th scope="col">Кол-во</th>
          <th scope="col">Стоимость</th>
          <th scope="col">Итого</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <CartItem item={item} key={item.id} index={index} onDelete={handleDelete} />
        ))}
        <tr>
          <td colSpan="5" className="text-right">
            Общая стоимость
          </td>
          <td>{sumPrices(items)} руб.</td>
        </tr>
      </tbody>
    </table>
  );
}
