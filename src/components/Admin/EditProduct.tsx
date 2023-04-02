import { useState } from 'react'

import Manager from '../../manager/Manager'
import { Product } from '../../data/productsdata'

interface AdminEditProduct {
    item: Product;
    manager: Manager;
    onsave: (product: Product) => void;
}

export default function EditProduct({ item, manager, onsave }: AdminEditProduct) {
    const [update, setupdate] = useState(false);
    function Update() {
        setupdate(!update);
    }

    return (
        <div style={{ width: "auto" }}>
            <h3>Id: {item.id}</h3>
            <div style={{ margin: "5px" }}>
                <div>Имя:</div>
                <input style={{ width: "100%" }} value={item.name} type={"text"} onChange={e => {
                    item.name = e.currentTarget.value;
                    Update();
                }} />
            </div>
            <div style={{ margin: "5px" }}>
                <div>Картинка (URL):</div>
                <input style={{ width: "100%" }} value={item.imageURL} type={"text"} onChange={e => {
                    item.imageURL = e.currentTarget.value;
                    Update();
                }} />
            </div>
            <div style={{ margin: "5px" }}>
                <div>Картинка (ALT):</div>
                <input style={{ width: "100%" }} value={item.imageAlt} type={"text"} onChange={e => {
                    item.imageAlt = e.currentTarget.value;
                    Update();
                }} />
            </div>
            <div style={{ margin: "5px" }}>
                <div>Тип измерения:</div>
                <input style={{ width: "100%" }} value={item.measurementType} type={"text"} onChange={e => {
                    item.measurementType = e.currentTarget.value;
                    Update();
                }} />
            </div>
            <div style={{ margin: "5px" }}>
                <div>Количество:</div>
                <input style={{ width: "100%" }} value={item.measurementValue} type={"text"} onChange={e => {
                    item.measurementValue = e.currentTarget.value;
                    Update();
                }} />
            </div>
            <div style={{ margin: "5px" }}>
                <div>Штрихкод:</div>
                <input style={{ width: "100%" }} value={item.barcode} type={"text"} onChange={e => {
                    item.barcode = e.currentTarget.value;
                    Update();
                }} />
            </div>
            <div style={{ margin: "5px" }}>
                <div>Производитель:</div>
                <input style={{ width: "100%" }} value={item.manufacturer} type={"text"} onChange={e => {
                    item.manufacturer = e.currentTarget.value;
                    Update();
                }} />
            </div>
            <div style={{ margin: "5px" }}>
                <div>Брэнд:</div>
                <input style={{ width: "100%" }} value={item.brand} type={"text"} onChange={e => {
                    item.brand = e.currentTarget.value;
                    Update();
                }} />
            </div>
            <div style={{ margin: "5px" }}>
                <div>Цена:</div>
                <input style={{ width: "100%" }} value={item.price} type={"number"} onChange={e => {
                    item.price = e.currentTarget.valueAsNumber;
                    Update();
                }} />
            </div>
            <div style={{ margin: "5px" }}>
                <div>Описание:</div>
                <textarea style={{ width: "100%" }} value={item.description} onChange={e => {
                    item.description = e.currentTarget.value;
                    Update();
                }} />
            </div>
            <div style={{ margin: "5px" }}>
                <div>Тип:</div>
                <textarea style={{ width: "100%" }} value={item.type} onChange={e => {
                    item.description = e.currentTarget.value;
                    Update();
                }} />
            </div>
            <div style={{ margin: "5px" }}>
                <div>Типы ухода:</div>
                {manager.productsManager.filterManager.CareTypes.map((t, i) => (
                    <div key={i}>
                        <input type={"checkbox"} checked={item.care.includes(i)} onChange={e => {
                            if (e.currentTarget.checked) {
                                item.care.push(i);
                            }
                            else {
                                item.care.splice(item.care.indexOf(i), 1);
                            }
                            item.care.sort();
                            Update();
                        }
                        } /> <span>{t}</span>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={()=>{onsave(item);}}>Save</button>
            </div>
        </div>
    )
}