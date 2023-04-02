import { useState } from 'react'

import clear from '../../assets/img/icons/delete.svg'
import Manager from '../../manager/Manager'
import Modal from './Modal/Modal'
import styles from './styles.module.scss'

interface CartProps {
    manager: Manager
}

export default function Cart({ manager }: CartProps) {
    const [_updateState, setUpdateState] = useState(false);
    const [modalState, setModalState] = useState(false);

    function updateState() {
        setUpdateState(!_updateState)
    }

    function CloseModal() {
        setModalState(false);
        manager.cartManager.deleteAll();
    }

    return (
        <>
            {
                <div className={`${styles.cart__container} ${styles.container}`}>
                    <h1 className={styles.cart__title}>Корзина</h1>
                    <div className={styles.cart__items}>
                        {manager.cartManager.elements
                            .map((c, i) => {
                                let finded = manager.productsManager.filterManager.products.find(p => p.id === c.id);
                                return { product: finded, count: c.count }
                            }).map((item, i) =>
                            (
                                <div key={i} className={styles.cart__block}>
                                    <div className={styles.cart__right}>
                                        <div className={styles.cart__center}>
                                            <img className={styles.cart__img} src={item.product?.imageURL} alt='product' />
                                        </div>
                                        <div>
                                            <div className={styles.cart__measurement}>
                                                <h5>{item.product?.measurementValue}</h5>
                                                <h5>{item.product?.measurementType}</h5>
                                            </div>
                                            <h2 className={styles.cart__name}>{item.product?.name}</h2>
                                            <h5>{item.product?.description}</h5>
                                        </div>
                                    </div>
                                    <div className={styles.cart__buttons}>
                                        <div className={styles.cart__dashed}></div>
                                        <button className={styles.cart__circle} onClick={e => { manager.cartManager.deleteFromCart(item.product!); updateState() }}>-</button>
                                        <h5 className={styles.cart__number}>{item.count}</h5>
                                        <button className={styles.cart__circle} onClick={() => { manager.cartManager.addToCart(item.product!); updateState() }}>+</button>
                                        <div className={styles.cart__dashed}></div>
                                        <h2 className={`${styles.cart__name} ${styles.cart__price}`}>{Math.round(item.product!.price * item.count)} ₸</h2>
                                        <div className={styles.cart__dashed}></div>
                                        <button className={`${styles.button__clear} ${styles.button}`} onClick={() => { manager.cartManager.deleteProductTotal(item.product!); updateState() }}><img src={clear} alt="clear" /></button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.cart__bottom}>
                        <button className={styles.button} onClick={e => { setModalState(true) }}><h6 className={styles.button__text}>Оформить заказ</h6></button>
                        <h2 className={styles.cart__name}>{Math.round(manager.cartManager.summTotal)} ₸</h2>
                    </div>
                </div>
            }
            {Math.round(manager.cartManager.summTotal) !== 0 && modalState && <Modal onClose={() => { CloseModal(); }} />}
        </>
    )
}