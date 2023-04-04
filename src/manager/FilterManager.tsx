import { Product } from '../data/productsData'

export default class FilterManager {
    products: Product[] = [];
    _minPrice: number = 0;
    _maxPrice: number = 10000;

    onFilterUpdated: Function = () => { };
    onProductsUpdated: Function = () => { };

    public get minPrice(): number {
        return this._minPrice;
    }

    public set minPrice(v: number) {
        this._minPrice = v;
        this.filterProducts();
    }

    public get maxPrice(): number {
        return this._maxPrice;
    }

    public set maxPrice(v: number) {
        this._maxPrice = v;
        this.filterProducts();
    }

    allManufacturers: string[] = [];
    allManufacturersCount: Map<string, number> = new Map();
    selectedManufacturers: string[] = [];
    selectedCareType?: number = undefined;

    filteredProducts: Product[] = [];

    careTypes: string[] = [
        "Уход за телом",
        "Уход за руками",
        "Уход за ногами",
        "Уход за лицом",
        "Уход за волосами"
    ]

    selectCareType(t?: number) {
        if (this.selectedCareType === t) {
            this.selectedCareType = undefined;
        }
        else {
            this.selectedCareType = t;
        }
        this.filterProducts();
    }

    selectManufacturer(m: string) {
        let index = this.selectedManufacturers.indexOf(m);
        if (index > -1) {
            this.selectedManufacturers.splice(index, 1);
        }
        else {
            this.selectedManufacturers.push(m);
        }
        this.filterProducts();
    }

    updateFilterData(allProducts: Product[] | undefined = undefined) {
        if (allProducts !== undefined) {
            this.products = allProducts;
        }
        this.allManufacturers = [];
        this.allManufacturersCount.clear();
        this.selectedCareType = undefined;
        this.selectedManufacturers = [];

        this.maxPrice = 0;
        this.minPrice = 10000;

        this.products.forEach(p => {
            let findindex = this.allManufacturers.indexOf(p.manufacturer);
            if (findindex > 0) {
                let count = this.allManufacturersCount.get(p.manufacturer);
                this.allManufacturersCount.set(p.manufacturer, count! + 1);
            }
            else {
                this.allManufacturers.push(p.manufacturer);
                this.allManufacturersCount.set(p.manufacturer, 1);
            }
            if (this.maxPrice < p.price) {
                this.maxPrice = p.price;
            }
            if (this.minPrice > p.price) {
                this.minPrice = p.price;
            }
        });
        this.allManufacturers.sort();
        this.filterProducts();
    }

    filterProducts() {
        this.filteredProducts = this.products.filter(
            p => (p.price >= this.minPrice && p.price <= this.maxPrice)
                && (this.selectedManufacturers.length === 0 || this.selectedManufacturers.includes(p.manufacturer))
                && (this.selectedCareType === undefined || p.care.includes(this.selectedCareType!)));
        this.onProductsUpdated();
    }

    clearFilter() {
        this.updateFilterData();
        this.onProductsUpdated();
    }
}