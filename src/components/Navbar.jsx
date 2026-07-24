import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="header" aria-label="Primary navigation">
      <div className="container-fluid">
        <div className="nav-links">
          <NavLink className="navbar-brand" to="/fashion">Fashion</NavLink>
          <NavLink className="navbar-brand" to="/makeup-skincare">Makeup &amp; Skincare</NavLink>
          <NavLink className="navbar-brand" to="/jewelry-watches">Jewelry &amp; Watches</NavLink>
        </div>

        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <h1>CHANEL</h1>
        </NavLink>

        <div className="nav-links">
          <NavLink className="navbar-brand" to="/eyewear-fragrance">Eyewear &amp; Fragrance</NavLink>
          <NavLink className="navbar-brand" to="/about">About Chanel</NavLink>
        </div>
      </div>
    </nav>
  );
}
