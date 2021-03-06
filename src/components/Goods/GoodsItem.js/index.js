import { Link } from 'react-router-dom';

export default function GoodsItem(props) {
  const { id, images, price, title } = props.item;
  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <div className="catalog-item-image">
          <img src={images[0]} className="card-img-top img-fluid" alt={title} />
        </div>
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{price.toLocaleString()} руб.</p>
          <Link to={`/catalog/${id}.html`} className="btn btn-outline-primary">
            Заказать
          </Link>
        </div>
      </div>
    </div>
  );
}
