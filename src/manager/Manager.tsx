import CartManager from './CartManager';
import ProductManager from './ProductManager';

export default class Manager {
    cartManager : CartManager = new CartManager();
    productsManager : ProductManager = new ProductManager();
}