import type { Components, JSX } from "../types/components";

interface NotFound extends Components.NotFound, HTMLElement {}
export const NotFound: {
    prototype: NotFound;
    new (): NotFound;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
