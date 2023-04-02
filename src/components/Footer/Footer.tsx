import arrow from '../../assets/img/icons/arrows/arrow-right--white.svg'
import download from '../../assets/img/icons/download.svg'
import tg from '../../assets/img/icons/social/tg.svg'
import wa from '../../assets/img/icons/social/wa.svg'
import logo from '../../assets/img/logo--white.svg'
import mastercard from '../../assets/img/payment/mastercard.svg'
import visa from '../../assets/img/payment/visa.svg'
import styles from './styles.module.scss'

function Footer() {
    return (
        <footer className={styles.footer__background}>
            <div className={`${styles.container} ${styles.footer__container}`}>
                <div className={`${styles.footer__block} ${styles.footer__hide}`}>
                    <img className={styles.footer__margin} src={logo} alt="logo" />
                    <h4 className={`${styles.footer__text} ${styles.footer__description}`}>Компания «Султан» — снабжаем<br /> розничные магазины товарами<br />
                        "под ключ" в Кокчетаве и Акмолинской<br /> области</h4>
                    <h5 className={`${styles.footer__text} ${styles.footer__margin}`}>Подпишись на скидки и акции</h5>
                    <div className={`${styles.header__search} ${styles.footer__search}`}>
                        <input className={`${styles.button__input} ${styles.footer__input}`} type="email" placeholder="Введите ваш E-mail" />
                        <img className={styles.footer__arrow} src={arrow} alt="arrow" />
                    </div>
                </div>
                <div className={styles.footer__mobile}>
                    <div className={styles.footer__flex}>
                        <img className={`${styles.footer__margin} ${styles.footer__logo}`} src={logo} alt="logo" />
                        <button className={`${styles.button} ${styles.footer__margin20} ${styles.footer__button}`}><h4 className={`${styles.button__text} ${styles.footer__button_text}`}>Прайс-лист</h4><img src={download} alt="downloads" /></button>
                    </div>
                    <h4 className={`${styles.footer__text} ${styles.footer__description}`}>Компания «Султан» — снабжаем<br /> розничные магазины товарами<br />
                        "под ключ" в Кокчетаве и Акмолинской<br /> области</h4>
                    <h5 className={`${styles.footer__text} ${styles.footer__margin}`}>Подпишись на скидки и акции</h5>
                    <div className={`${styles.header__search} ${styles.footer__search}`}>
                        <input className={`${styles.button__input} ${styles.footer__input}`} type="email" placeholder="Введите ваш E-mail" />
                        <img className={styles.footer__arrow} src={arrow} alt="arrow" />
                    </div>
                </div>
                <div className={styles.footer__block}>
                    <h2 className={`${styles.footer__title} ${styles.footer__margin20}`}>Меню сайта:</h2>
                    <h4 className={`${styles.footer__text} ${styles.footer__margin20}`}>О компании</h4>
                    <h4 className={`${styles.footer__text} ${styles.footer__margin20}`}>Доставка и оплата</h4>
                    <h4 className={`${styles.footer__text} ${styles.footer__margin20}`}>Возврат</h4>
                    <h4 className={`${styles.footer__text} ${styles.footer__margin20}`}>Оплата</h4>
                </div>
                <div className={styles.footer__block}>
                    <h2 className={`${styles.footer__title} ${styles.footer__margin20}`}>Категории:</h2>
                    <h4 className={`${styles.footer__text} ${styles.footer__margin20}`}>Бытовая химия</h4>
                    <h4 className={`${styles.footer__text} ${styles.footer__margin20}`}>Косметика и гигиена</h4>
                    <h4 className={`${styles.footer__text} ${styles.footer__margin20}`}>Товары для дома</h4>
                    <h4 className={`${styles.footer__text} ${styles.footer__margin20}`}>Товары для детей и мам</h4>
                </div>
                <div className={styles.footer__block}>
                    <h2 className={`${styles.footer__title} ${styles.footer__hide}`}>Скачать прайс-лист</h2>
                    <button className={`${styles.button} ${styles.footer__margin20} ${styles.footer__hide}`}><h4 className={styles.button__text}>Прайс-лист</h4><img src={download} alt="downloads" /></button>
                    <h4 className={`${styles.footer__text} ${styles.footer__margin} ${styles.footer__hide}`}>Связь в мессенджерах:</h4>
                    <div className={`${styles.footer__msg} ${styles.footer__hide}`}>
                        <img src={wa} alt="wa" />
                        <img src={tg} alt="tg" />
                    </div>
                </div>
                <div className={`${styles.footer__block} ${styles.footer__last}`}>
                    <div>
                        <h2 className={styles.footer__title}>Контакты:</h2>
                        <div className={styles.footer__contacts}>
                            <a href="#"><h4 className={styles.footer__tel}>+7 (777) 490-00-91</h4></a>
                            <h6 className={styles.footer__text}>время работы: 9:00-20:00</h6>
                            <p className={styles.footer__underline}>Заказать звонок</p>
                        </div>
                        <a href="mailto:opt.sultan@mail.ru"><h4 className={styles.footer__tel}>opt.sultan@mail.ru </h4></a>
                        <h5 className={`${styles.footer__text} ${styles.footer__title}`}>На связи в любое время</h5>
                        <div className={styles.footer__msg}>
                            <img src={visa} alt="visa" />
                            <img src={mastercard} alt="mastercard" />
                        </div>
                    </div>
                    <div>
                        <h4 className={`${styles.footer__text} ${styles.footer__margin} ${styles.footer__mobile}`}>Связь в мессенджерах:</h4>
                        <div className={`${styles.footer__msg} ${styles.footer__mobile}`}>
                            <img src={wa} alt="wa" />
                            <img src={tg} alt="tg" />
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer;