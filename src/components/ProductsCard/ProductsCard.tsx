import { useEffect, useState } from 'react'

import arrowDown from '../../assets/img/icons/arrows/arrow--down.svg'
import arrowUp from '../../assets/img/icons/arrows/arrow--top.svg'
import cartIcon from '../../assets/img/icons/basket--white.svg'
import download from '../../assets/img/icons/download--black.svg'
import share from '../../assets/img/icons/share.svg'
import styles from './styles.module.scss'
import { ProductsProps } from '../Products/Products'
import { Product } from '../../data/productsdata'

export default function ProductsCard({ manager }: ProductsProps) {
    const [_updateState, setUpdateState] = useState(false);
    const [inLoading, setInLoading] = useState(true);
    const [findProduct, setProduct] = useState<Product>();
    const [stateDesc, setStateDesc] = useState(true);
    const [stateParam, setStateParam] = useState(true);

    function updateState() {
        setUpdateState(!_updateState)
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get('id');
        if (idParam != null) {
            setProduct(manager.productsManager.GetProductById(parseInt(idParam)))
            updateState();
        }
        setInLoading(false);
    }, [])

    function Product(product: Product) {
        return (
            <div key={product.id} className={`${styles.container} ${styles.product__container}`}>
                <img className={styles.product__img} src={product.imageURL} alt="image" />
                <div className={styles.product__right}>
                    <div className={styles.product__name}>
                        <h2 className={styles.product__bold_title}>{product.brand}</h2>
                        <h2 className={styles.product__text}>{product.name}</h2>
                    </div>
                    <div className={styles.product__measurement}>
                        <h5>{product.measurementValue}</h5>
                        <h5>{product.measurementType}</h5>
                    </div>
                    <div className={styles.product__price}>
                        <h2 className={styles.product__bold_title}>{product.price} ₸</h2>
                        <button className={styles.product__circle} onClick={e => { manager.cartManager.deleteFromCart(product); updateState() }}>-</button>
                        <h5 className={styles.product__number}>{manager.cartManager.elements.find(e => e.id === product.id)?.count ? manager.cartManager.elements.find(e => e.id === product.id)?.count : 0}</h5>
                        <button className={styles.product__circle} onClick={() => { manager.cartManager.addToCart(product); updateState() }}>+</button>
                        <button className={`${styles.button} ${styles.button__cart}`} onClick={() => { manager.cartManager.addToCart(product); updateState() }}>
                            <h5 className={styles.button__text}>В корзину</h5>
                            <img src={cartIcon} alt="cart" />
                        </button>
                    </div>
                    <div className={styles.product__share}>
                        <img className={styles.product__block_share} src={share} alt="share" />
                        <div className={styles.product__block_text}>При покупке от <b className={styles.product__nowrap}>10 000 ₸</b> бесплатная доставка по Кокчетаву и области</div>
                        <button className={styles.product__block_list}>
                            <h4 className={styles.product__download}>Прайс-лист</h4>
                            <img src={download} alt="download" />
                        </button>
                    </div>

                    <div className={styles.product__mobile}>
                        <div className={styles.product__mobile_price}>
                            <h2 className={styles.product__bold_title}>{product.price} ₸</h2>
                            <button className={styles.product__circle} onClick={e => { manager.cartManager.deleteFromCart(product); updateState() }}>-</button>
                            <h5 className={styles.product__number}>{manager.cartManager.elements.find(e => e.id === product.id)?.count ? manager.cartManager.elements.find(e => e.id === product.id)?.count : 0}</h5>
                            <button className={styles.product__circle} onClick={() => { manager.cartManager.addToCart(product); updateState() }}>+</button>
                        </div>
                        <div className={styles.product__mobile_price}>
                            <button className={`${styles.button} ${styles.button__cart}`} onClick={() => { manager.cartManager.addToCart(product); updateState() }}>
                                <h5 className={styles.button__text}>В корзину</h5>
                                <img src={cartIcon} alt="cart" />
                            </button>
                            <img className={styles.product__block_share} src={share} alt="share" />
                        </div>
                        <div className={styles.product__mobile_share}>
                            <div className={`${styles.product__block_text} ${styles.product__mobile_margin}`}>При покупке от <b className={styles.product__nowrap}>10 000 ₸</b> бесплатная доставка по Кокчетаву и области</div>
                            <button className={`${styles.product__block_list} ${styles.product__mobile_width} ${styles.product__mobile_margin}`}>
                                <h4 className={styles.product__download}>Прайс-лист</h4>
                                <img src={download} alt="download" />
                            </button>
                        </div>
                    </div>

                    <div className={styles.product__rows}>
                        <div className={styles.product__row}><h5>Производитель: </h5><h4 className={styles.product__bold}>{product.manufacturer}</h4></div>
                        <div className={styles.product__row}><h5>Бренд: </h5><h4 className={styles.product__bold}>{product.brand}</h4></div>
                        <div className={styles.product__row}><h5>Артикул: </h5><h4 className={styles.product__bold}>{product.id}</h4></div>
                        <div className={styles.product__row}><h5>Штрихкод: </h5><h4 className={styles.product__bold}>{product.barcode}</h4></div>
                    </div>
                    <div className={styles.product__description}>
                        <button className={styles.product__arrow} onClick={e => setStateDesc(!stateDesc)}>
                            <h3 className={styles.product__title}>Описание</h3>
                            {stateDesc ?
                                <img src={arrowUp} alt="arrow up" /> :
                                <img src={arrowDown} alt="arrow down" />}
                        </button>
                        {stateDesc ? <h5>{product.description}</h5> : ''}
                    </div>
                    <div className={styles.product__params}>
                        <button className={styles.product__arrow} onClick={e => setStateParam(!stateParam)}>
                            <h3 className={styles.product__title}>Характеристики</h3>
                            {stateParam ?
                                <img src={arrowUp} alt="arrow up" /> :
                                <img src={arrowDown} alt="arrow down" />}
                        </button>
                        {stateParam ?
                            <div className={styles.product__rows}>
                                <div className={styles.product__row}><h5>Назначение: </h5><h4 className={styles.product__bold}>{product.name}</h4></div>
                                <div className={styles.product__row}><h5>Тип: </h5><h4 className={styles.product__bold}>{product.type}</h4></div>
                                <div className={styles.product__row}><h5>Производитель: </h5><h4 className={styles.product__bold}>{product.manufacturer}</h4></div>
                                <div className={styles.product__row}><h5>Бренд: </h5><h4 className={styles.product__bold}>{product.brand}</h4></div>
                                <div className={styles.product__row}><h5>Артикул: </h5><h4 className={styles.product__bold}>{product.id}</h4></div>
                                <div className={styles.product__row}><h5>Штрихкод: </h5><h4 className={styles.product__bold}>{product.barcode}</h4></div>
                                <div className={styles.product__row}><h5>Вес: </h5><h4 className={styles.product__bold}>{product.measurementValue} {product.measurementType}</h4></div>
                                <div className={styles.product__row}><h5>Объём: </h5><h4 className={styles.product__bold}>{product.measurementValue} {product.measurementType}</h4></div>
                                <div className={styles.product__row}><h5>Кол-во в коробке: </h5><h4 className={styles.product__bold}>{product.measurementValue} {product.measurementType}</h4></div>
                            </div>
                            : ''}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {inLoading ? "Загрузка..." :
                findProduct !== undefined ? Product(findProduct) : "Не найдено"}
        </div>
    )
}