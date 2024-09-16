import type { Components, JSX } from "../types/components";

interface AdminDashboard extends Components.AdminDashboard, HTMLElement {}
export const AdminDashboard: {
    prototype: AdminDashboard;
    new (): AdminDashboard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
