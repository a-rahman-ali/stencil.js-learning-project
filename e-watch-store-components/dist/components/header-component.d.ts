import type { Components, JSX } from "../types/components";

interface HeaderComponent extends Components.HeaderComponent, HTMLElement {}
export const HeaderComponent: {
    prototype: HeaderComponent;
    new (): HeaderComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
