import type { Components, JSX } from "../types/components";

interface LoginComponent extends Components.LoginComponent, HTMLElement {}
export const LoginComponent: {
    prototype: LoginComponent;
    new (): LoginComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
