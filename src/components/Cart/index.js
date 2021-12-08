import { useSelector } from 'react-redux';
import CartTable from './CartTable';
import OrderForm from './OrderForm';

export default function Cart() {
  const { items } = useSelector((state) => state.cartItemListReducer);
  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      {items.length !== 0 ? (
        <>
          <CartTable />
          <OrderForm />
        </>
      ) : (
        <span className="text-center" style={{ display: 'block' }}>
          Корзина пуста
        </span>
      )}
    </section>
  );
}
