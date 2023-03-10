import { Link } from 'react-router-dom'

function Header(props) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img className="logo" src="/img/logo.png" alt="Logo"/>
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кросовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img src="/img/cart.svg" alt="Cart"/>
          <span>1205 руб.</span>
        </li>
        <li>
          <Link to="/favorites">
            <img className="mr-20 cu-p" src="/img/heart.svg" alt="Favorite"/>
          </Link>
        </li>
        <li>
          <img className="mr-30 cu-p" src="/img/user.svg" alt="User"/>
        </li>
      </ul>
    </header>
  )
}

export default Header