import type { Components, JSX } from "../types/components";

interface AdminLogin extends Components.AdminLogin, HTMLElement {}
export const AdminLogin: {
    prototype: AdminLogin;
    new (): AdminLogin;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
