import closeIcon from '../../../assets/img/icons/close.svg'
import success from '../../../assets/img/icons/success.svg'
import styles from './styles.module.scss'

interface ModalProps {
    onClose: Function;
}

function Modal({ onClose: close }: ModalProps) {

    return (
        <div onClick={() => { close(); }}>
            <div className={styles.modal__container}>
                <img className={styles.modal__close} src={closeIcon} alt="close" />
                <img className={styles.modal__img} src={success} alt="success" />
                <h1>Спасибо за заказ</h1>
                <h2 className={styles.modal__text}>Наш менеджер свяжется с вами в ближайшее время</h2>
            </div>
            <div className={styles.modal__back} ></div>
        </div>
    )
}

export default Modal;