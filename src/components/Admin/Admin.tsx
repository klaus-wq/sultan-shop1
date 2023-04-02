import { useState } from "react";
import { Product } from "../../data/productsdata";
import { ProductsProps } from "../Products/Products";
import EditProduct from "./EditProduct";

export default function Admin({ manager }: ProductsProps) {
    const [update, setupdate] = useState(false);
    function Update() {
        setupdate(!update);
    }
    const [currentProduct, setCurrentProduct] = useState<Product>();

    function Save(product: Product) {
        manager.productsManager.SaveProduct(product);
        Update();
    }

    function Delete(product: Product) {
        manager.productsManager.DeleteProduct(product);
        Update();
    }

    function CreateNew() {
        let lastindex = 0;
        manager.productsManager.filterManager.products.forEach(p => lastindex = Math.max(p.id, lastindex));
        lastindex++;
        setCurrentProduct({
            id: lastindex,
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
                            Delete(p);
                        }} >Удалить</button>
                    </div>
                </div>
            ))}
            <div>
                <button onClick={CreateNew}><h3>Создать новый</h3></button>
            </div>

            <div style={{ margin: "10px" }}>
                <h3>Редактирование:</h3>
                {currentProduct !== undefined ?
                    <EditProduct item={currentProduct} manager={manager} onsave={Save} />
                    : <span>Выберите продукт</span>}
            </div>
        </div>
    )
}