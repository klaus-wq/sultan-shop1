import { render, screen } from "@testing-library/react";
import { Cart } from "../../components/Cart/Cart"
import Manager from "../../manager/Manager";
import { Product } from "../../data/productsData";
import { ProductsList } from "./TestData";

describe("Cart component", () => {
  test("renders cart with 0 items", () => {
    const mgr = new Manager();
    let Products: Product[] = []
    mgr.productsManager.filterManager.updateFilterData(Products)
    Products.forEach(p => {
      mgr.cartManager.addToCart(p)
    })
    render(<Cart manager={mgr} />);
    expect(screen.getByText(/Корзина/)).toBeInTheDocument();
    expect(screen.getByText(/0 ₸/)).toBeInTheDocument();
  });

  test("renders cart with different items", async () => {
    const mgr = new Manager();
    mgr.productsManager.filterManager.updateFilterData(ProductsList)
    ProductsList.forEach(p => {
      mgr.cartManager.addToCart(p)
    })
    render(<Cart manager={mgr} />);
    expect(screen.getByText(/Корзина/)).toBeInTheDocument();
    expect(screen.getByText(/2346 ₸/)).toBeInTheDocument();
  });

  test("check modal window in Cart", async () => {
    const mgr = new Manager();
    mgr.productsManager.filterManager.updateFilterData(ProductsList)
    ProductsList.forEach(p => {
      mgr.cartManager.addToCart(p)
    })
    render(<Cart manager={mgr} />);
    screen.getByText(/Оформить заказ/).click();
    render(<Cart manager={mgr} />);
    expect(screen.getByText(/Спасибо/)).toBeInTheDocument();
  });
})
