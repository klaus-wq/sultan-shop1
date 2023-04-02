import { Product } from '../data/productsdata'

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
        this.FilterProducts();
    }

    public get maxPrice(): number {
        return this._maxPrice;
    }

    public set maxPrice(v: number) {
        this._maxPrice = v;
        this.FilterProducts();
    }

    allManufacturers: string[] = [];
    allManufacturersCount: number[] = [];
    selectedManufacturers: string[] = [];
    selectedCareType?: number = undefined;

    filteredProducts: Product[] = [];

    CareTypes: string[] = [
        "Уход за телом",
        "Уход за руками",
        "Уход за ногами",
        "Уход за лицом",
        "Уход за волосами"
    ]

    SelectCareType(t?: number) {
        if (this.selectedCareType === t) {
            this.selectedCareType = undefined;
        }
        else {
            this.selectedCareType = t;
        }
        this.FilterProducts();
    }

    SelectManufacturer(m: string) {
        let index = this.selectedManufacturers.indexOf(m);
        if (index > -1) {
            this.selectedManufacturers.splice(index, 1);
        }
        else {
            this.selectedManufacturers.push(m);
        }
        this.FilterProducts();
    }

    Clear() {

    }

    UpdateFilterData(allProducts: Product[] | undefined = undefined) {
        if (allProducts !== undefined) {
            this.products = allProducts;
        }
        this.allManufacturers = [];
        this.allManufacturersCount = [];
        this.selectedCareType = undefined;
        this.selectedManufacturers = [];

        this.maxPrice = 0;
        this.minPrice = 10000;

        this.products.forEach(p => {
            let findIndex = this.allManufacturers.indexOf(p.manufacturer);
            if (findIndex > 0) {
                this.allManufacturersCount[findIndex]++;
            }
            else {
                this.allManufacturers.push(p.manufacturer);
                this.allManufacturersCount.push(1);
            }
            if (this.maxPrice < p.price) {
                this.maxPrice = p.price;
            }
            if (this.minPrice > p.price) {
                this.minPrice = p.price;
            }
        });
        this.allManufacturers.sort();
        this.FilterProducts();
    }

    FilterProducts() {
        this.filteredProducts = this.products.filter(
            p => (p.price >= this.minPrice && p.price <= this.maxPrice)
                && (this.selectedManufacturers.length === 0 || this.selectedManufacturers.includes(p.manufacturer))
                && (this.selectedCareType === undefined || p.care.includes(this.selectedCareType!)));
        this.onProductsUpdated();
    }

    ClearFilter() {
        this.UpdateFilterData();
        this.onProductsUpdated();
    }
}