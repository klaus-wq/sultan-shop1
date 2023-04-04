import FilterManager from '../../../manager/FilterManager';
import styles from '../FilterCarePanel/styles.module.scss';

export interface FilterProps {
    filter: FilterManager
}

export default function FilterCarePanel({ filter }: FilterProps) {
    return (
        <div className={styles.care__container}>
            {Object.values(filter.careTypes).map((t, i) => (
                <>
                    <div style={{background: filter.selectedCareType === i ? "#EDEDED" : ''}} className={styles.care__filter} 
                    onClick={() => { filter.selectCareType(i) }}>{t}</div>
                </>
            ))}
        </div>
    )
}