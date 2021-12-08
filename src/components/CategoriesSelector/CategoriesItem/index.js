import { NavLink } from 'react-router-dom';

export default function CategoriesItem({ item, active, onClick }) {
  return (
    <li className="nav-item" onClick={() => onClick(item.id)}>
      <NavLink to="#" className="nav-link" isActive={() => active === item.id}>
        {item.title}
      </NavLink>
    </li>
  );
}
