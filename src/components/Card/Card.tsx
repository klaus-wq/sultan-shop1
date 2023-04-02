import { NavLink } from 'react-router-dom'

import cartIcon from '../../assets/img/icons/basket--white.svg'
import CartManager from '../../manager/CartManager'
import styles from './styles.module.scss'
import { Product } from '../../data/productsdata'

export interface CardProps {
  product: Product;
  cart: CartManager
  //addToCart: (id: number) => void;
}

function Card({ product, cart }: CardProps) {
  return (
    <div key={product.id} className={styles.cards__container}>
      <NavLink className={styles.cards__nav} to={`product?id=${product.id}`}>
        <img className={styles.cards__img} src={product.imageURL} alt="" />
        <div className={styles.cards__block}>
          <h5>{product.measurementValue}</h5>
          <h5>{product.measurementType}</h5>
        </div>
        <div className={styles.cards__title}>
          <h3>{product.manufacturer}</h3>
          <h4>{product.name}</h4>
        </div>
        <div className={styles.cards__blocks}>
          <div className={styles.cards__block}>
            <h5>Штрихкод: </h5>
            <h4 className={styles.cards__text}>{product.barcode}</h4>
          </div>
          <div className={styles.cards__block}>
            <h5>Производитель: </h5>
            <h4 className={styles.cards__text}>{product.manufacturer}</h4>
          </div>
          <div className={styles.cards__block}>
            <h5>Бренд: </h5>
            <h4 className={styles.cards__text}>{product.brand}</h4>
          </div>
        </div>
      </NavLink>
      <div className={styles.cards__bottom}>
        <h3>{product.price} ₸</h3>
        <button className={`${styles.button} ${styles.button__cart}`} onClick={() => { cart.addToCart(product); }}>
          <h6 className={styles.button__text}>В корзину</h6>
          <img src={cartIcon} alt="cart" />
        </button>
      </div>
    </div>

  );
}

export default Card;