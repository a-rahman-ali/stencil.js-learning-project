import type { Components, JSX } from "../types/components";

interface NavBar extends Components.NavBar, HTMLElement {}
export const NavBar: {
    prototype: NavBar;
    new (): NavBar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
