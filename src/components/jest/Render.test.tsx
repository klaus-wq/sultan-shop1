import { render, screen } from "@testing-library/react";
import Manager from "../../manager/Manager";
import { Cart } from "../Cart/Cart";
import { Product } from "../../data/productsData";
import { ProductsList } from "./TestData";

jest.mock("../Cart/Cart.tsx", () => ({
    Cart: jest.fn(() => (
        <div data-testid="Cart">Корзина 0 ₸</div>
    ))
}))

describe("Cart", () => {
    test("constructs a Cart with a manager prop", () => {
        const mgr = new Manager();
        let Products: Product[] = []
        mgr.productsManager.filterManager.updateFilterData(ProductsList)
        Products.forEach(p => {
            mgr.cartManager.addToCart(p)
        })
        render(<Cart manager={mgr} />)
        expect(Cart).toHaveBeenCalledWith(
            { manager: mgr },
            expect.anything())
    })
})