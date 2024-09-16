import type { Components, JSX } from "../types/components";

interface LoadingSpinner extends Components.LoadingSpinner, HTMLElement {}
export const LoadingSpinner: {
    prototype: LoadingSpinner;
    new (): LoadingSpinner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
