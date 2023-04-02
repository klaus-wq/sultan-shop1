import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import basket from '../../assets/img/icons/basket.svg'
import cardsBlack from '../../assets/img/icons/cards--black.svg'
import cards from '../../assets/img/icons/cards.svg'
import download from '../../assets/img/icons/download.svg'
import location from '../../assets/img/icons/location.svg'
import mail from '../../assets/img/icons/mail.svg'
import searchBlack from '../../assets/img/icons/search--black.svg'
import search from '../../assets/img/icons/search.svg'
import logo from '../../assets/img/logo.svg'
import operator from '../../assets/img/operator.png'
import sideBar from '../../assets/img/sideBar.svg'
import CartManager from '../../manager/CartManager'
import styles from './styles.module.scss'

interface HeaderProps {
    cart: CartManager;
}

function Header({ cart }: HeaderProps) {
    const [count, setCount] = useState(0);

    cart.onCartUpdated = () => {

        setCount(cart.countTotal);
    };

    return (
        <div className={styles.wrapper + ' ' + styles.container}>
            <div className={styles.header__top}>
                <div className={styles.header__section}>
                    <img src={location} alt="location" />
                    <div className={styles.header__block}>
                        <h4 className={styles.header__bold}>г. Кокчетав, ул. Ж. Ташенова 129Б </h4>
                        <h5>(Рынок Восточный)</h5>
                    </div>
                </div>
                <div className={styles.header__section}>
                    <img src={mail} alt="mail" />
                    <div className={styles.header__block}>
                        <a href="mailto:opt.sultan@mail.ru"><h4 className={styles.header__bold}>opt.sultan@mail.ru </h4></a>
                        <h5>На связи в любое время</h5>
                    </div>
                </div>
                <div className={styles.header__section}>
                    <div className={styles.header__list}>
                        <a href="#"><h5>О компании</h5></a>
                        <a href="#"><h5 className={styles.dashed}>Доставка и оплата</h5></a>
                        <a href="#"><h5 className={styles.dashed}>Возврат</h5></a>
                        <a href="#"><h5 className={styles.dashed}>Контакты</h5></a>
                    </div>
                </div>
            </div>
            <div className={styles.header__top}>
                <NavLink to="/"><img src={logo} alt="logo" /></NavLink>
                <button className={styles.button}><h4 className={styles.button__text}>Каталог</h4><img src={cards} alt="cards" /></button>
                <div className={styles.header__search}>
                    <input type="text" className={` ${styles.button__input}`} placeholder="Поиск..." />
                    <button className={styles.header__button}><img src={search} alt="search" /></button>
                </div>
                <div className={styles.header__block}>
                    <a href="#"><h4 className={styles.header__bold}>+7 (777) 490-00-91</h4></a>
                    <h6>время работы: 9:00-20:00</h6>
                    <p className={styles.header__underline}>Заказать звонок</p>
                </div>
                <img src={operator} alt="operator" />
                <button className={styles.button}><h4 className={styles.button__text}>Прайс-лист</h4><img src={download} alt="downloads" /></button>
                <NavLink to="/cart">
                    <div className={styles.header__basket}>
                        <img src={basket} alt="basket" />
                        <div className={styles.circle}><span className={styles.circle__text}>{count}</span></div>
                    </div>
                </NavLink>
                <div>
                    <h5>Корзина</h5>
                    <h5 className={styles.header__bold}>{Math.round(cart.summTotal)} ₸</h5>
                </div>
            </div>
            <div className={styles.header_mobile}>
                <div className={styles.header_mobile__up}>
                    <img className={styles.header_mobile__menu} src={sideBar} alt="sideBar" />
                    <img src={logo} alt="logo" />
                    <NavLink to="/cart">
                        <div className={styles.header__basket}>
                            <img src={basket} alt="basket" />
                            <div className={styles.circle}><span className={styles.circle__text}>{count}</span></div>
                        </div>
                    </NavLink>
                </div>
                <div className={styles.header_mobile__bottom}>
                    <div className={styles.header_mobile__block}>
                        <img src={cardsBlack} alt="catalog" />
                        <h5 className={styles.header_mobile__text}>Каталог</h5>
                    </div>
                    <div className={styles.header_mobile__dashed}></div>
                    <div  className={styles.header_mobile__block}>
                        <img src={searchBlack} alt="search" />
                        <h5 className={styles.header_mobile__text}>Поиск</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;