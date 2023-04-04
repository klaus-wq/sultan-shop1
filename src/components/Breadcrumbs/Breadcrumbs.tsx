import { NavLink, useLocation } from 'react-router-dom'

import styles from './styles.module.scss'
import { ProductsProps } from '../Products/Products'

export default function Breadcrumbs({ manager }: ProductsProps) {
    let Location = useLocation();
    
    function getName(url: string) {
        switch (url) {
            case "cart":
                return "Корзина";
            case "product":
                return "Продукт " + getProductName();
            case "admin":
                return "Админка";
            case "/":
                return "Косметика и гигиена";
            default:
                return url + " не назначен";
        }
    }

    function getPathArray() {
        let arr = window.location.pathname.split("/").filter(p => p !== "");

        if (arr.length <= 0) {
            return ["/"];
        }

        if (arr[0] === 'product') {
            arr.splice(0, 0, "/")
        }

        return arr;
    }

    function getProductName() {
        const urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get('id');
        if (idParam !== null) {
            return manager.productsManager.getProductById(parseInt(idParam))?.name
        }
    }

    function getLink(link: string) {
        if (link === "product") {
            return window.location.href;
        }
        if (link === "/") {
            return link;
        }
        return "/" + link;
    }

    return (
        <div className={`${styles.container} ${styles.breadcrumbs__container}`}>
            <div>
                <NavLink to="/"><h5>Главная</h5></NavLink>
            </div>
            {getPathArray().map((p, i) =>
            (
                <div key={i}>
                    <NavLink to={getLink(p)}><h5 className={styles.breadcrumbs__link}>{getName(p)}</h5></NavLink>
                </div>
            ))}
        </div>
    )
}