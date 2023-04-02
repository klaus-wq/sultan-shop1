import { NavLink, useLocation } from 'react-router-dom'

import styles from './styles.module.scss'
import { ProductsProps } from '../Products/Products'

export default function Breadcrumbs({ manager }: ProductsProps) {
    let Location = useLocation();
    function GetName(url: string) {
        switch (url) {
            case "cart":
                return "Корзина";
            case "product":
                return "Продукт " + GetProductName();
            case "admin":
                return "Админка";
            case "/":
                return "Косметика и гигиена";
            default:
                return url + " не назначен";
        }
    }

    function GetPathArray() {
        let arr = window.location.pathname.split("/").filter(p => p !== "");

        if (arr.length <= 0) {
            return ["/"];
        }

        if (arr[0] === 'product') {
            arr.splice(0, 0, "/")
        }

        return arr;
    }

    function GetProductName() {
        const urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get('id');
        if (idParam !== null) {
            return manager.productsManager.GetProductById(parseInt(idParam))?.name
        }
    }

    function GetLink(link: string) {
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
            {GetPathArray().map((p, i) =>
            (
                <div key={i}>
                    <NavLink to={GetLink(p)}><h5 className={styles.breadcrumbs__link}>{GetName(p)}</h5></NavLink>
                </div>
            ))}
        </div>
    )
}