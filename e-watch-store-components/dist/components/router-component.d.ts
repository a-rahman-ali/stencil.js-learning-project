import type { Components, JSX } from "../types/components";

interface RouterComponent extends Components.RouterComponent, HTMLElement {}
export const RouterComponent: {
    prototype: RouterComponent;
    new (): RouterComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
