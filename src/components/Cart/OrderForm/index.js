import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOrder } from '../../../actions/actionCreators';

export default function OrderForm() {
  const { items } = useSelector((state) => state.cartItemListReducer);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [agreement, setAgreement] = useState(false);
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    switch (target.name) {
      case 'phone':
        setPhone(target.value);
        break;
      case 'address':
        setAddress(target.value);
        break;
      case 'agreement':
        setAgreement(!agreement);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const order = {
      owner: {
        phone,
        address,
      },
      items,
    };
    dispatch(sendOrder(order));
  };

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Ваш телефон"
              value={phone}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              className="form-control"
              id="address"
              name="address"
              placeholder="Адрес доставки"
              value={address}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
              name="agreement"
              onChange={handleChange}
              required={true}
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
          </div>
          <button type="submit" className="btn btn-outline-secondary">
            Оформить
          </button>
        </form>
      </div>
    </section>
  );
}
