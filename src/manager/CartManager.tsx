import { Product } from '../data/productsData'

type CartElement = {
    id: number;
    count: number;
}

export default class CartManager {
    elements: CartElement[] = [];
    onCartUpdated: Function = () => { };
    countTotal : number = 0;
    summTotal : number = 0;

    constructor() {
        let cart = localStorage.getItem('cart');
        if (cart !== null) {
            //this.elements = ;
        }
    }

    addToCart(product: Product) {
        let finded = this.elements.find(c => c.id === product.id);
        if (finded !== undefined) {
            finded.count++;
        }
        else {
            let New: CartElement = { id: product.id, count: 1 };
            this.elements.push(New);
        }
        this.summTotal += product.price;
        this.countTotal++;
        this.onCartUpdated();
    }

    deleteFromCart(product: Product) {
        let finded = this.elements.find(c => c.id === product.id);
        if (finded !== undefined) {
            finded.count--;
            this.summTotal -= product.price;
            if (finded.count === 0) {
                this.deleteProductTotal(product)
            }
        }
        this.countTotal--;
        this.onCartUpdated();
    }
    
    deleteAll() {
        this.elements = []
        this.countTotal = 0;
        this.summTotal = 0;
        this.onCartUpdated();
    }

    deleteProductTotal(product: Product) {
        let finded = this.elements.find(c => c.id === product.id);
        if (finded !== undefined) {
            this.elements.splice(this.elements.indexOf(finded),1);
            this.countTotal -= finded.count;
            this.summTotal -= product.price * finded.count;
        }
        this.onCartUpdated();
    }
}