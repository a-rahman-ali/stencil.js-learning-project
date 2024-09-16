import type { Components, JSX } from "../types/components";

interface SignupComponent extends Components.SignupComponent, HTMLElement {}
export const SignupComponent: {
    prototype: SignupComponent;
    new (): SignupComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
