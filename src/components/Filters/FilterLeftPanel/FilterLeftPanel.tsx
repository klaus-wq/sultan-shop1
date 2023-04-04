import { useState } from 'react'

import arrowDown from '../../../assets/img/icons/arrows/arrow--down.svg'
import arrowUp from '../../../assets/img/icons/arrows/arrow--top.svg'
import clear from '../../../assets/img/icons/delete.svg'
import search from '../../../assets/img/icons/search.svg'
import styles from './styles.module.scss'
import { FilterProps } from '../FilterCarePanel/FilterCarePanel'

export default function FilterLeftPanel({ filter }: FilterProps) {
    const [state, setState] = useState(false);
    const [searchState, setSearchState] = useState('');
    const [showState, setShowState] = useState(4);
    const [hideAll, setHideAll] = useState(true);

    filter.onFilterUpdated = () => {
        setState(!state);
    };

    function clearFilter() {
        setSearchState('');
        filter.clearFilter();
    }

    return (
        <div className={styles.left__container}>
            <div className={styles.left__dashed}>
                <div>
                    <div className={styles.left__mobile}>
                        <h3 className={styles.left__params}>Подбор по параметрам</h3>
                        <div className={styles.left__mobilebutton} onClick={() => setHideAll(!hideAll)}>
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {hideAll ? <path d="M1 1L5 5L9 1" stroke="#3F4E65" /> : <path d="M9 5L5 1L1 5" stroke="#3F4E65" />}
                            </svg>
                        </div>
                    </div>

                    <div className={hideAll && styles.left__hide}>
                        <h5 className={styles.left__price}>Цена <span className={styles.bold}>₸</span></h5>
                        <div className={styles.left__block}>
                            <input className={styles.left__min} type='number' value={filter.minPrice} min="0"
                                onChange={e => {
                                    filter.minPrice = e.target.valueAsNumber;
                                }} />
                            <div className={styles.left__line}>-</div>
                            <input className={styles.left__min} type='number' value={filter.maxPrice} min="0"
                                onChange={e => {
                                    filter.maxPrice = e.target.valueAsNumber;
                                }} />
                        </div>
                    </div>
                </div>

                <div className={hideAll && styles.left__hide}>
                    <h3 className={styles.left__manufacturer}>Производитель</h3>
                    <div className={`${styles.header__search} ${styles.left__search}`}>
                        <input type="text" className={`${styles.button__input} ${styles.left__input}`} placeholder="Поиск..." value={searchState} onChange={e => setSearchState(e.target.value)} />
                        <button className={styles.header__button}><img src={search} alt="search" /></button>
                    </div>
                    <div>
                        {filter.allManufacturers
                            .filter(m => searchState === '' || m.toLowerCase().includes(searchState.toLowerCase()))
                            .slice(0, showState)
                            .map((m, i) => (
                                <div className={styles.left__checkbox}>
                                    <input type='checkbox'
                                        checked={filter.selectedManufacturers.includes(m)}
                                        onChange={e => { filter.selectManufacturer(m) }} />
                                    <span className={styles.left__manufacturers}>{m} ({filter.allManufacturersCount.get(m)})</span>
                                </div>
                            ))}
                        <button className={styles.left__show} onClick={e => showState === 4 ? setShowState(filter.allManufacturers.length) : setShowState(4)}>
                            {showState === 4 ?
                                <div>
                                    <span>Показать все</span>
                                    <img src={arrowDown} alt="arrow down" className={styles.left__arrow} />
                                </div> :
                                <div>
                                    <span>Скрыть все</span>
                                    <img src={arrowUp} alt="arrow up" className={styles.left__arrow} />
                                </div>}
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div className={styles.left__buttons}>
                    <button className={`${styles.button} ${styles.button__show}`}><h4 className={styles.button__text}>Показать</h4></button>
                    <button className={`${styles.button} ${styles.button__clear}`} onClick={() => clearFilter()}><img src={clear} alt="clear" /></button>
                </div>
                <div className={styles.left__care}>
                    {Object.values(filter.careTypes).map((t, i) => (
                        <>
                            <h4 style={{ color: filter.selectedCareType === i ? "#111111" : '#5C6370' }} onClick={() => { filter.selectCareType(i) }}>{t}</h4>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}