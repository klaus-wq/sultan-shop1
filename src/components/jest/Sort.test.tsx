import { render, screen } from "@testing-library/react";
import Manager from "../../manager/Manager";
import { Products } from "../Products/Products";
import TestRenderer  from 'react-test-renderer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductsList } from "./TestData";

describe("FilterCarePanel component", () => {
    test("sort products by price increase", () => {
        const mgr = new Manager();
        mgr.productsManager.inLoading = false
        mgr.productsManager.filterManager.updateFilterData(ProductsList)
        render(<BrowserRouter><Routes><Route path="/" element={<Products manager={mgr} defaultType={0}/>}/></Routes></BrowserRouter>);
        let PERSIL = screen.getByText((/Стиральный порошок PERSIL/))
        let Gel = screen.getByText((/Гель/))
        expect(PERSIL.compareDocumentPosition(Gel)).toBe(2);
    });

    test("sort products by price decrease", () => {
        const mgr = new Manager();
        mgr.productsManager.inLoading = false
        mgr.productsManager.filterManager.updateFilterData(ProductsList)
        render(<BrowserRouter><Routes><Route path="/" element={<Products manager={mgr} defaultType={1}/>}/></Routes></BrowserRouter>);
        let PERSIL = screen.getByText((/Стиральный порошок PERSIL/))
        let Gel = screen.getByText((/Гель/))
        expect(PERSIL.compareDocumentPosition(Gel)).toBe(4);
    });

    test("sort products by name increase", () => {
        const mgr = new Manager();
        mgr.productsManager.inLoading = false
        mgr.productsManager.filterManager.updateFilterData(ProductsList)
        render(<BrowserRouter><Routes><Route path="/" element={<Products manager={mgr} defaultType={2}/>}/></Routes></BrowserRouter>);
        let PERSIL = screen.getByText((/Стиральный порошок PERSIL/))
        let Gel = screen.getByText((/Гель/))
        expect(PERSIL.compareDocumentPosition(Gel)).toBe(4);
    });

    test("sort products by name decrease", () => {
        const mgr = new Manager();
        mgr.productsManager.inLoading = false
        mgr.productsManager.filterManager.updateFilterData(ProductsList)
        render(<BrowserRouter><Routes><Route path="/" element={<Products manager={mgr} defaultType={3}/>}/></Routes></BrowserRouter>);
        let PERSIL = screen.getByText((/Стиральный порошок PERSIL/))
        let Gel = screen.getByText((/Гель/))
        expect(PERSIL.compareDocumentPosition(Gel)).toBe(2);
    });
})
