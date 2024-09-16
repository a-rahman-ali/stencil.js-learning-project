import type { Components, JSX } from "../types/components";

interface CartComponent extends Components.CartComponent, HTMLElement {}
export const CartComponent: {
    prototype: CartComponent;
    new (): CartComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
