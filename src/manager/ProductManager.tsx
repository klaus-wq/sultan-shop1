import { GetProducts, Product } from '../data/productsdata';
import FilterManager from './FilterManager';

export default class ProductManager {
    inLoading: boolean = true;
    onLoading: Function = () => { };
    filterManager: FilterManager = new FilterManager();

    readonly localStoreName: string = "products";

    GetfilteredProducts() {
        return this.filterManager.filteredProducts;
    }

    async LoadProducts() {
        let products: Product[];
        let local = localStorage.getItem(this.localStoreName);
        if (local !== null) {
            let loaded = JSON.parse(local) as Product[];
            if (loaded.length > 0) {
                products = loaded;
            }
            else {
                products = await GetProducts();
            }
        }
        else {
            products = await GetProducts();
        }
        this.filterManager.UpdateFilterData(products);
        this.inLoading = false;
        console.log("ProductsLoaded");
        this.onLoading();
    }

    async SaveProduct(product: Product) {
        let find = this.filterManager.products.findIndex(P => P.id === product.id);
        if (find >= 0) {
            this.filterManager.products[find] = product;
        }
        else {
            this.filterManager.products.push(product);
        }
        this.Update();
    }

    async DeleteProduct(product: Product) {
        let find = this.filterManager.products.findIndex(P => P.id === product.id);
        if (find >= 0) {
            this.filterManager.products.splice(find, 1);
            this.Update();
        }
    }

    Update() {
        this.filterManager.UpdateFilterData();
        localStorage.setItem(this.localStoreName, JSON.stringify(this.filterManager.products));
    }

    GetProductById(id: number) {
        if (this.inLoading) {
            throw "Не загружено...";
        }
        return this.filterManager.products.find(p => p.id === id)
    }
}