import { useState } from "react";
import { Product } from "../../data/productsData";
import { ProductsProps } from "../Products/Products";
import EditProduct from "./EditProduct";

export default function Admin({ manager }: ProductsProps) {
    const [_update, setUpdate] = useState(false);
    function update() {
        setUpdate(!_update);
    }
    const [currentProduct, setCurrentProduct] = useState<Product>();

    function save(product: Product) {
        manager.productsManager.saveProduct(product);
        update();
    }

    function _delete(product: Product) {
        manager.productsManager.deleteProduct(product);
        update();
    }

    function createNew() {
        let lastIndex = 0;
        manager.productsManager.filterManager.products.forEach(p => lastIndex = Math.max(p.id, lastIndex));
        lastIndex++;
        setCurrentProduct({
            id: lastIndex,
            price: 0,
            care: [] as Number[]
        } as Product);
    }

    return (
        <div style={{ margin: "10px" }}>
            {manager.productsManager.filterManager.products.map((p, i) => (
                <div key={i} style={{ margin: "6px", border: "solid", borderWidth: "1px", borderRadius: "10px", padding: "5px" }}>
                    <span style={{}}><b>ID: {p.id}</b> {p.name}</span>
                    <div>
                        <button style={{ margin: "4px", }}
                            onClick={() => { setCurrentProduct(p) }}>Редактировать</button>
                        <button style={{ margin: "4px", }} onClick={() => {
                            _delete(p);
                        }} >Удалить</button>
                    </div>
                </div>
            ))}
            <div>
                <button onClick={createNew}><h3>Создать новый</h3></button>
            </div>

            <div style={{ margin: "10px" }}>
                <h3>Редактирование:</h3>
                {currentProduct !== undefined ?
                    <EditProduct item={currentProduct} manager={manager} onSave={save} />
                    : <span>Выберите продукт</span>}
            </div>
        </div>
    )
}