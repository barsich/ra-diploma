export default function CartItem({ item, index, onDelete }) {
  const { id, name, size, count, price } = item;
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>
        <a href={`/ra-diploma/catalog/${id}.html`}>{name}</a>
      </td>
      <td>{size}</td>
      <td>{count}</td>
      <td>{price.toLocaleString()} руб.</td>
      <td>{(price * count).toLocaleString()} руб.</td>
      <td>
        <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(item)}>Удалить</button>
      </td>
    </tr>
  );
}
