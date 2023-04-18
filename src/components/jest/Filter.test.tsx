import { BrowserRouter, Routes, Route } from "react-router-dom";
import Manager from "../../manager/Manager";
import { Products } from "../Products/Products";
import { render, screen } from "@testing-library/react";
import { ProductsList } from "./TestData";

describe("FilterLeftPanel component", () => {
    test("check manufacturer", async () => {
        const mgr = new Manager();
        mgr.productsManager.inLoading = false
        mgr.productsManager.filterManager.updateFilterData(ProductsList)
        mgr.productsManager.filterManager.selectManufacturer('Henkel')
        render(<BrowserRouter><Routes><Route path="/" element={<Products manager={mgr}/>}/></Routes></BrowserRouter>);
        let PENKA = screen.queryByText(/Пенка/)
        let Gel = screen.getByText(/Гель/)
        expect(PENKA).toBeNull();
        expect(Gel).toBeInTheDocument();
    });

    test("check price sort", async () => {
        const mgr = new Manager();
        mgr.productsManager.inLoading = false
        mgr.productsManager.filterManager.updateFilterData(ProductsList)
        mgr.productsManager.filterManager._maxPrice = 399
        mgr.productsManager.filterManager._minPrice = 299
        render(<BrowserRouter><Routes><Route path="/" element={<Products manager={mgr}/>}/></Routes></BrowserRouter>);
        let MIF = screen.queryByText(/Cтиральный порошок Миф/)
        let PENKA = screen.getByText(/Пенка/)
        expect(MIF).toBeNull();
        expect(PENKA).toBeInTheDocument();
    });

    test("check care type", async () => {
        const mgr = new Manager();
        mgr.productsManager.inLoading = false
        mgr.productsManager.filterManager.updateFilterData(ProductsList)
        mgr.productsManager.filterManager.selectCareType(1)
        render(<BrowserRouter><Routes><Route path="/" element={<Products manager={mgr}/>}/></Routes></BrowserRouter>);
        let MIF = screen.getByText(/Стиральный порошок Миф/)
        let PENKA = screen.queryByText(/Пенка/)
        expect(PENKA).toBeNull();
        expect(MIF).toBeInTheDocument();
    });
})