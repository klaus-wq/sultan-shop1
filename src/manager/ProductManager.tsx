import { getProducts, Product } from '../data/productsData';
import FilterManager from './FilterManager';

export default class ProductManager {
    inLoading: boolean = true;
    onLoading: Function = () => { };
    filterManager: FilterManager = new FilterManager();

    readonly localStoreName: string = "products";

    getfilteredProducts() {
        return this.filterManager.filteredProducts;
    }

    async loadProducts() {
        let products: Product[];
        let local = localStorage.getItem(this.localStoreName);
        if (local !== null) {
            let loaded = JSON.parse(local) as Product[];
            if (loaded.length > 0) {
                products = loaded;
            }
            else {
                products = await getProducts();
            }
        }
        else {
            products = await getProducts();
        }
        this.filterManager.updateFilterData(products);
        this.inLoading = false;
        console.log("ProductsLoaded");
        this.onLoading();
    }

    async saveProduct(product: Product) {
        let find = this.filterManager.products.findIndex(P => P.id === product.id);
        if (find >= 0) {
            this.filterManager.products[find] = product;
        }
        else {
            this.filterManager.products.push(product);
        }
        this.update();
    }

    async deleteProduct(product: Product) {
        let find = this.filterManager.products.findIndex(P => P.id === product.id);
        if (find >= 0) {
            this.filterManager.products.splice(find, 1);
            this.update();
        }
    }

    update() {
        this.filterManager.updateFilterData();
        localStorage.setItem(this.localStoreName, JSON.stringify(this.filterManager.products));
    }

    getProductById(id: number) {
        if (this.inLoading) {
            throw "Не загружено...";
        }
        return this.filterManager.products.find(p => p.id === id)
    }
}