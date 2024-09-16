import type { Components, JSX } from "../types/components";

interface HomeComponent extends Components.HomeComponent, HTMLElement {}
export const HomeComponent: {
    prototype: HomeComponent;
    new (): HomeComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
