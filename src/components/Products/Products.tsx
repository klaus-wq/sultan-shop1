import { useState } from 'react'

import arrowLeft from '../../assets/img/icons/arrows/arrow--left.svg'
import arrowRight from '../../assets/img/icons/arrows/arrow--right.svg'
import Card from '../../components/Card/Card'
import Manager from '../../manager/Manager'
import FilterCarePanel from '../Filters/FilterCarePanel/FilterCarePanel'
import FilterLeftPanel from '../Filters/FilterLeftPanel/FilterLeftPanel'
import styles from './styles.module.scss'

export interface ProductsProps {
    manager: Manager
}

function Products({ manager }: ProductsProps) {
    const [state, setstate] = useState(false);
    const [sortType, setSortType] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage: number = 15;

    manager.productsManager.filterManager.onProductsUpdated = () => {
        setstate(!state);
    }

    function getPageNumbers() {
        let pageArray = []
        let countPages = manager.productsManager.GetfilteredProducts().length / productsPerPage
        for (let i = 1; i < countPages + 1; i++) {
            pageArray.push(i)
        }
        return pageArray
    }

    return (
        <div className={`${styles.container} ${styles.products__container}`}>
            <div className={styles.products__top}>
                <h1>Косметика и гигиена</h1>
            </div>

            <div><FilterCarePanel filter={manager.productsManager.filterManager} /></div>

            <div className={styles.products__parentblock}>
                {<FilterLeftPanel filter={manager.productsManager.filterManager} />}
                <div className={styles.products__block}>
                    <div className={styles.products__sort}>
                        <h3 className={styles.products__title}>Сортировка</h3>
                        <select className={styles.products__select} onChange={e => { setSortType(parseInt(e.target.value)) }}>
                            <option value={0}><h3>Цена по возрастанию</h3></option>
                            <option value={1}><h3>Цена по убыванию</h3></option>
                            <option value={2}><h3>Название по возрастанию</h3></option>
                            <option value={3}><h3>Название по убыванию</h3></option>
                        </select>
                    </div>
                    <div className={styles.products__cards}>
                        {
                            manager.productsManager.inLoading ? <h3>Loading...</h3> :
                                manager.productsManager.GetfilteredProducts().length > 0 ?
                                    manager.productsManager.GetfilteredProducts()
                                        .sort((a, b) => {
                                            switch (sortType) {
                                                case 0:
                                                    if (a.price >= b.price) {
                                                        return 1;
                                                    }
                                                    else {
                                                        return -1;
                                                    }
                                                case 1:
                                                    if (a.price <= b.price) {
                                                        return 1;
                                                    }
                                                    else {
                                                        return -1;
                                                    }
                                                case 2:
                                                    if (a.name <= b.name) {
                                                        return 1;
                                                    }
                                                    else {
                                                        return -1;
                                                    }
                                                case 3:
                                                    if (a.name >= b.name) {
                                                        return 1;
                                                    }
                                                    else {
                                                        return -1;
                                                    }
                                                default:
                                                    return 0;
                                            }
                                        })
                                        .slice(productsPerPage * currentPage, productsPerPage * currentPage + productsPerPage)
                                        .map((p, i) =>
                                        (
                                            <Card cart={manager.cartManager} product={p}></Card>
                                        ))
                                    :
                                    <h3>Не найдено</h3>
                        }
                    </div>

                    <div className={styles.products__pages}>
                        <button className={styles.products__arrow} onClick={() => currentPage !== 0 && setCurrentPage(currentPage - 1)}><img src={arrowLeft} alt="arrow-left" /></button>
                        <div className={styles.products__arrows}>
                            {getPageNumbers().map((p, i) => (
                                <h5 className={styles.products__page + ' ' + (i === currentPage ? styles.products__pageActive : "")}
                                    onClick={() => {
                                        if (i !== currentPage) {
                                            setCurrentPage(i);
                                        }
                                    }}>
                                    <span>{p}</span>
                                </h5>
                            ))}</div>
                        <button className={styles.products__arrow} onClick={() =>
                            currentPage < getPageNumbers().length - 1 && setCurrentPage(currentPage + 1)}>
                            <img src={arrowRight} alt="arrow-right" /></button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Products;
